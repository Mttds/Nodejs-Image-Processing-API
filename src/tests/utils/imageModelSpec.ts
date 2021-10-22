"use strict";
import Image from '../../utils/imageModel';
import fs from 'fs';
import path from 'path';

const PROJECT_FOLDER: string = process.env.PWD as string;

describe('Image class testing', () => {
  it('Resizes an image and checks its existence in the thumbs folder', async () => {
    const img = new Image(
      "encenadaport",
      parseInt('100'),
      parseInt('200')
    );

    fs.copyFile(
      path.join(PROJECT_FOLDER, '/assets', '/image-uploader', 'encenadaport.jpg'),
      img.getImagePath(), 
      (err) => {
        if (err) throw err;
    });
    await img.sharpImage();
    expect(await img.checkThumbsImage()).toBe(true);
  });
});
