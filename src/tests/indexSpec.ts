import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Gets the api/images endpoint with a non existing image in the in folder', () => {
    it('Gets the api endpoint', async () => {
        const response = await request.get('/api/images?image=invalid&width=100&height=100');
        expect(response.status).toBe(400);
        //done();
    });

    it('Gets the api/images endpoint with a non existing image param', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
        //done();
    });

    it('Gets the api/images endpoint with an existing image', async () => {
        const response = await request.get('/api/images?image=encenadaport&width=100&height=100');
        expect(response.status).toBe(200);
        //done();
    });

    it('Gets the api/images endpoint with an existing image and request an already cached image', async () => {
        const response = await request.get('/api/images?image=encenadaport&width=100&height=100');
        expect(response.status).toBe(200);
        //done();
    });
});