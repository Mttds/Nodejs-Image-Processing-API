'use strict';
import express from 'express';
import url from 'url';
import logger from '../middleware/logger';
import images from './api/images';
const routes = express.Router();

routes.get('/', logger, (req, res): void => {
  console.log('/api - Go to /api/images for the Image Processing API.');
  res
    .status(200)
    .send('/api - Go to /api/images for the Image Processing API.');
});
routes.use('/images', images);

export default routes;
