"use strict";
import express from 'express';
import { promises as fs } from 'fs';
import fsAsync from 'fs';
import sharp from 'sharp';
import path from 'path';
const images = express.Router();

const PROJECT_FOLDER: string = (process.env.PWD as string);
const INPUT_FOLDER: string = path.join(PROJECT_FOLDER,'/assets/image-uploader/in');
const SAVED_THUMBS_FOLDER: string = path.join(PROJECT_FOLDER,'/assets/image-uploader/thumbs');
const REL_INPUT_FOLDER: string = 'image-uploader/in';
const REL_SAVED_THUMBS_FOLDER: string = 'image-uploader/thumbs';

class Image {
  private image: string;
  private thumbsImage: string;
  private width: number;
  private height: number;

  /*
  Constructor
  */
  public constructor (
    image: string,
    width: number,
    height: number,
  )
  {
    this.image = image;
    this.width = width;
    this.height = height;
    this.thumbsImage = `${image}_${width}_${height}`;
  }

  /*
  Getters.
  */
  public getImage(): string        { return this.image        };
  public getThumbsImage(): string  { return this.thumbsImage  };
  public getWidth(): number        { return this.width        };
  public getHeight(): number       { return this.height       };

  /*
  Methods.
  */
  public getImagePath(): string {
    return path.join(INPUT_FOLDER,`${this.image}.jpg`);
    //`${INPUT_FOLDER}/${this.image}.jpg`;
  }
  public getThumbsImagePath(): string {
    return path.join(SAVED_THUMBS_FOLDER,`${this.image}_${this.width}_${this.height}.jpg`);
    //`${SAVED_THUMBS_FOLDER}/${this.image}_${this.width}_${this.height}.jpg`;
  }
  public getImageRelativePath(): string {
    return `${REL_INPUT_FOLDER}`;
  }
  public getThumbsImageRelativePath(): string {
    return `${REL_SAVED_THUMBS_FOLDER}`;
  }

  private checkFile = async (fullpath: string): Promise<boolean> => {
    console.log("checkFile call...");
    try {
      let check = await fs.stat(fullpath);
      console.log(check, check.isFile());
      if(check.isFile())
        return Promise.resolve(true);
      return Promise.resolve(false);
    }
    catch (e) {
      console.log(e)
      return Promise.resolve(false);
    }
  }

  public async checkImage(): Promise<boolean> {
    console.log(`Checking image ${this.getImagePath()}`)
    return await this.checkFile(this.getImagePath());
    /*if(fsAsync.existsSync(this.getImagePath())) {
      console.log(`Image ${this.getImagePath()} exists.`)
      return true;
    }
    else {
      console.log(`Image ${this.getImagePath()} does not exist.`);
      return false;
    }*/
  }

  public async checkThumbsImage(): Promise<boolean> {
    console.log(`Checking image ${this.getThumbsImagePath()}`)
    return await this.checkFile(this.getThumbsImagePath());
    /*if(fsAsync.existsSync(this.getThumbsImagePath())) {
      console.log(`Image ${this.getThumbsImagePath()} exists.`);
      return true;
    }
    else {
      console.log(`Image ${this.getThumbsImagePath()} does not exist.`);
      return false;
    }*/
  }

  public async sharpImage(): Promise<Image> {
    console.log(`Resizing image ${this.image} into ${this.getThumbsImagePath()}`)
    try {
      if(!await this.checkThumbsImage()) {
        console.log(`Image ${this.image} does not exist. Processing...`);
        console.log(`Width: ${this.width} | Height: ${this.height}`);
        let newData = await fs.open(this.getThumbsImagePath(), "w+");
        console.log(`Input: ${this.width} - ${this.height}`)
        await newData.write(
          await sharp(
            this.getImagePath()
          ).resize((this.width), (this.height)).toBuffer()
        )
        newData.close();
      }
      else {
        console.log(`Image ${this.getThumbsImagePath()} already exists. Rendering existing cached image...`);
      }

      return Promise.resolve(this); // or just return this which is implicitly a Promies<Image>
    }
    catch (err) {
      console.log("Error: " + err);
      return Promise.reject(this);
    }
  };
}

images.get('/', async (req, res) => {
  console.log('Images API route');
  try {
    let queryParamImage = req.query.image as string;
    let queryParamWidth = req.query.width as string;
    let queryParamHeight = req.query.height as string;
    if(req.query.image && req.query.width && req.query.height) {
      const img = new Image (
        queryParamImage,
        parseInt(queryParamWidth),
        parseInt(queryParamHeight)
      );
      console.log(img);
      if(await img.checkImage()) {
        await img.sharpImage();
        console.log(`Processed image ${img.getImage()}!`);
        res.set('Connection', 'close');
        res.status(200).render('pages/images', {imagefile: `${img.getThumbsImageRelativePath()}/${img.getThumbsImage()}.jpg`});
      }
      else {
        console.log("Image not found!");
        res.set('Connection', 'close');
        res.status(400).send("Image not found!");
      }
    }
    else {
      console.log("Missing URL params!");
      res.set('Connection', 'close');
      res.status(400).send("Image not found!");
    }
    
  } catch (e) {
    console.log("Error at endpoint /api/images:", e);
    res.set('Connection', 'close');
    res.status(500).send("Image not found!");
  }
});

export = images;
