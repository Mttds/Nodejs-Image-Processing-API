import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';

const PROJECT_FOLDER: string = process.env.PWD as string;

const request = supertest(app);
describe('Endpoint tests', () => {
  it('Gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?image=invalid&width=100&height=100'
    );
    expect(response.status).toBe(400);
    //done();
  });

  it('Gets the api/images endpoint with a non existing image param', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
    //done();
  });

  it('Gets the api/images endpoint with an existing image', async () => {
    fs.copyFile(
      path.join(PROJECT_FOLDER, '/assets', '/image-uploader', 'encenadaport.jpg'),
      path.join(PROJECT_FOLDER, '/assets', '/image-uploader', '/in', 'encenadaport.jpg'), 
      (err) => {
        if (err) throw err;
    });
    const response = await request.get(
      '/api/images?image=encenadaport&width=100&height=100'
    );
    expect(response.status).toBe(200);
    //done();
  });

  it('Gets the api/images endpoint with an existing image and request an already cached image', async () => {
    const response = await request.get(
      '/api/images?image=encenadaport&width=100&height=100'
    );
    expect(response.status).toBe(200);
    //done();
  });
});
