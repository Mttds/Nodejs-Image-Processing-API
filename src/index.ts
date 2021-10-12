import express from 'express';
import routes from './routes/index';
require('console-stamp')(console, '[HH:MM:ss.l]');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Go to /api/images for the Image Processing API.');
});
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
