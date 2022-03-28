import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Testing Server endpoint', () => {
  it('Should Successfully Pass Test For Valid EndPoint', async () => {
    const endpointResponse = await request.get('/');
    expect(endpointResponse.statusCode).toBe(200);
  });

  it('Should Successfully Pass Test For Invalid EndPoint', async () => {
    const endpointResponse = await request.get('/api');
    expect(endpointResponse.statusCode).toBe(404);
  });
});
