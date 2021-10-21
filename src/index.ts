'use strict';
import express from 'express';
import routes from './routes/index';
import ejs from 'ejs';
require('console-stamp')(console, '[HH:MM:ss.l]');

const app = express();
const port = 3001;

// set the view engine to ejs
// we will need it to serve the dynamic html
// with the embedded image that we read from the file system
app.set('view engine', 'ejs');

// set the static folder for serving images
// the virtual path /api is used because the
// api/images routes has the get('/'...) relative to api
app.use('/api', express.static('assets'));

app.get('/', (req, res): void => {
  console.log('/ - Go to /api/images for the Image Processing API.');
  res.status(200).send('/ - Go to /api/images for the Image Processing API.');
});
app.use('/api', routes);

app.listen(port, (): void => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
