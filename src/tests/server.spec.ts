import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Testing Api Home Routes', () => {
  it('Get Successful Responed To Home Page EndPoint Test Request', async () => {
    const endpointResponse = await request.get('/');
    expect(endpointResponse.statusCode).toBe(200);
  });

  it('Should Successfully Pass Test For Invalid Routing Request', async () => {
    const endpointResponse = await request.get('/api');
    expect(endpointResponse.statusCode).toBe(404);
  });
});
