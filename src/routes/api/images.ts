import exp from 'constants';
import express from 'express';
import { promises as fs } from 'fs';
import fsAsync from 'fs';
import sharp from 'sharp';
import path from 'path';
const images = express.Router();

const PROJECT_FOLDER: string = (process.env.PWD as string);
const INPUT_FOLDER: string = path.join(PROJECT_FOLDER,'/assets/image-uploader/in');
const SAVED_THUMBS_FOLDER: string = path.join(PROJECT_FOLDER,'/assets/image-uploader/thumbs');

class Image {
  private image: string;
  private width: number;
  private height: number;

  /*
  Constructor
  */
  public constructor(
    image: string,
    width: number,
    height: number,
  )
  {
    this.image = image;
    this.width = width;
    this.height = height;
  }

  /*
  Getters.
  */
  public getImage()  { return this.image  };
  public getWidth()  { return this.width  };
  public getHeight() { return this.height };

  /*
  Methods.
  */
  public getImagePath() {
    return path.join(INPUT_FOLDER,`${this.image}.jpg`);
    //`${INPUT_FOLDER}/${this.image}.jpg`;
  }
  public getThumbsImage() {
    return path.join(SAVED_THUMBS_FOLDER,`${this.image}_${this.width}_${this.height}.jpg`);
    //`${SAVED_THUMBS_FOLDER}/${this.image}_${this.width}_${this.height}.jpg`;
  }

  public checkImage() {
    console.log(`Checking image ${this.getImagePath()}`)
    if(fsAsync.existsSync(this.getImagePath())) {
      console.log(`Image ${this.getImagePath()} exists.`)
      return true;
    }
    else {
      console.log(`Image ${this.getImagePath()} does not exist.`);
      return false;
    }
  }

  public checkThumbsImage() {
    console.log(`Checking image ${this.getThumbsImage()}`)
    if(fsAsync.existsSync(this.getThumbsImage())) {
      console.log(`Image ${this.getThumbsImage()} exists.`);
      return true;
    }
    else {
      console.log(`Image ${this.getThumbsImage()} does not exist.`);
      return false;
    }
  }

  public async sharpImage(): Promise<Image> {
    console.log(`Resizing image ${this.image} into ${this.getThumbsImage()}`)
    if(this.checkThumbsImage()) { // TO-FIX: checkThumbsImage is not an async function. Missing await means that the check is skipped
      console.log(`Image ${this.image} does not exist. Processing...`);
      console.log(`Width: ${this.width} | Height: ${this.height}`);
      let newData = await fs.open(this.getThumbsImage(), "w+");
      await newData.write(
        await sharp(
          this.getImagePath()
        ).resize((this.width as number), (this.height as number)).toBuffer()
      );
      return this;
    }

    console.log(`Image ${this.getThumbsImage()} already exists. Rendering existing cached image...`);
    return this;
  };
}

images.get('/', (req, res) => {
  console.log('Images API route');
  try {
    let queryParamImage = (req.query.image || "" as string);
    let queryParamWidth = (req.query.width || 0 as number);
    let queryParamHeight = (req.query.height || 0 as number);
    const img = new Image(
      (queryParamImage as string),
      (queryParamWidth as number),
      (queryParamHeight as number)
    );
    console.log(img);
    if(img.getImage() != "" && img.checkImage()) {
      img.sharpImage();
      console.log(`Processed image ${img.getImage()}!`);
    }
    else {
      console.log("Image not found!");
    }
    res.send("OK!");
  } catch (e) {
    console.log("Error at endpoint /api/images");
    res.send("KO!");
  }
});

export = images;
