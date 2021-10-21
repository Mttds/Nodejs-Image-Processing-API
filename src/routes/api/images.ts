'use strict';
import express from 'express';
import Image from '../../utils/imageModel';

const images = express.Router();

images.get('/', async (req, res) => {
  console.log('Images API route');
  try {
    let queryParamImage = req.query.image as string;
    let queryParamWidth = req.query.width as string;
    let queryParamHeight = req.query.height as string;
    if (
      req.query.image &&
      req.query.width &&
      req.query.height &&
      !isNaN(parseInt(queryParamWidth)) &&
      !isNaN(parseInt(queryParamHeight))
    ) {
      const img = new Image(
        queryParamImage,
        parseInt(queryParamWidth),
        parseInt(queryParamHeight)
      );
      console.log(img);
      if (await img.checkImage()) {
        await img.sharpImage();
        console.log(`Processed image ${img.getImage()}!`);
        res.set('Connection', 'close');
        res
          .status(200)
          .render('pages/images', {
            imagefile: `${img.getThumbsImageRelativePath()}/${img.getThumbsImage()}.jpg`,
          });
      } else {
        console.log('Image not found!');
        res.set('Connection', 'close');
        res.status(400).send('Image not found!');
      }
    } else {
      console.log('Missing or invalid URL params!');
      res.set('Connection', 'close');
      res.status(400).send('Missing or invalid URL params!');
    }
  } catch (e) {
    console.log('Error at endpoint /api/images:', e);
    res.set('Connection', 'close');
    res.status(500).send(`Error at endpoint /api/images: ${e}`);
  }
});

export = images;
