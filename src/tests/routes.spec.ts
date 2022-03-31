// import supertest from 'supertest';
// import db from '../database/database';
// import UserModel from '../model/user.model';
// import UserType from '../types/user.types';
// import ProductsType from '../types/product.types';
// import ProductModel from '../model/product.model';
// import OrdersType from '../types/order.types';
// import OrderModel from '../model/orders.model';
// import app from '../server';

// const request = supertest(app);
// let token = '';

// const userModel = new UserModel();
// const user = {
//   email: 'test@test.com',
//   first_name: 'userFname',
//   last_name: 'userLname',
//   user_name: 'userName',
//   password: 'test123'
// } as UserType;

// const productModel = new ProductModel();
// const product = {
//   product_name: 'test11',
//   price: 10
// } as ProductsType;

// // test api routes
// describe('test api routes', () => {
//   beforeAll(async () => {
//     const createdUser = await userModel.createUser(user);
//     user.id = createdUser.id;

//     const createProduct = await productModel.createProduct(product);
//     product.id = createProduct.id;
//   });

//   afterAll(async () => {
//     const connection = await db.connect();
//     const sql = 'DELETE FROM users;';
//     await connection.query(sql);
//     connection.release();
//   });

//   // user api routes tests
//   describe('Test CRUD API methods', () => {
//     it('should create new user', async () => {
//       const res = await request
//         .post('/api/users/')
//         .set('Content-type', 'application/json')
//         .send({
//           email: 'test9@test.com',
//           first_name: 'userFname9',
//           last_name: 'userLname2',
//           user_name: 'userName2',
//           password: 'test1234'
//         } as UserType);
//       expect(res.status).toBe(200);
//       const { email, username, firstname, lastname } = res.body.data;
//       expect(email).toBe('test9@test.com');
//       expect(firstname).toBe('userFname9');
//       expect(lastname).toBe('userLname2');
//       expect(username).toBe('userName2');
//     });

//     describe('Test Authenticate methods', () => {
//       it('Should Successfully Pass Test if authenticate to get token', async () => {
//         const res = await request
//           .post('/api/users/authenticate')
//           .set('Content-type', 'application/json')
//           .send({
//             email: 'test@test.com',
//             password: 'test123'
//           });
//         expect(res.status).toBe(200);
//         const { id, email, token: userToken } = res.body.data;
//         expect(id).toBe(user.id);
//         expect(email).toBe(user.email);
//         token = userToken;
//       });

//       it('Should Successfully Pass Test if failed to authenticate with wrong email', async () => {
//         const res = await request
//           .post('/api/users/authenticate')
//           .set('Content-type', 'application/json')
//           .send({
//             email: 'wrongEmail@test.com',
//             password: 'test123'
//           });
//         expect(res.status).toBe(401);
//       });
//     });

//     it('should get list of users', async () => {
//       const res = await request
//         .get('/api/users')
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//     });

//     it('should get user info', async () => {
//       const res = await request
//         .get(`/api/users/${user.id}`)
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//       expect(res.body.data.username).toBe('userName');
//       expect(res.body.data.email).toBe('test@test.com');
//     });

//     it('should update user info', async () => {
//       const res = await request
//         .patch(`/api/users/${user.id}`)
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           ...user,
//           firstname: 'firstnameupdated',
//           lastname: 'lastnameupdated',
//           username: 'usernameupdated'
//         });
//       expect(res.status).toBe(200);
//     });

//     it('should delete user', async () => {
//       const res = await request
//         .delete(`/api/users/${user.id}`)
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//       expect(res.body.data.id).toBe(user.id);
//     });
//   });
//   // products api routes tests
//   describe('Test product CRUD API methods', () => {
//     it('should create new product', async () => {
//       const res = await request
//         .post('/api/products/')
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           product_name: 'test',
//           price: 10
//         } as ProductsType);
//       expect(res.status).toBe(200);
//     });

//     it('should get list of products', async () => {
//       const res = await request
//         .get('/api/products')
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//       expect(res.body.data.length).toBe(2);
//     });

//     it('should get product info', async () => {
//       const res = await request
//         .get(`/api/users/${product.id}`)
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//     });

//     it('should update product info', async () => {
//       const res = await request
//         .patch(`/api/users/${product.id}`)
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           ...product,
//           productname: 'test1122',
//           price: 102
//         });
//       expect(res.status).toBe(200);
//     });

//     it('should delete product', async () => {
//       const res = await request
//         .delete(`/api/products/${product.id}`)
//         .set('Content-type', 'application/json')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//     });
//   });
// });
