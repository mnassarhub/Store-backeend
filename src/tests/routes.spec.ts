import OrdertType from '../types/order.types';
import OrderModel from '../model/orders.model';
import UserType from '../types/user.types';
import UserModel from '../model/user.model';
import ProductType from '../types/product.types';
import ProductModel from '../model/product.model';
import db from '../database/database';
import app from '../server';
import supertest from 'supertest';

const request = supertest(app);
let token = '';

const userModel = new UserModel();
const user = {
  email: 'testw12@test.com',
  first_name: 'userFname',
  last_name: 'userLname',
  user_name: 'userName',
  password: 'test123'
} as UserType;

const userToDelete = {
  email: 'testw1212@test.com',
  first_name: 'userFname',
  last_name: 'userLname',
  user_name: 'userName',
  password: 'test123'
} as UserType;

const productModel = new ProductModel();
const product = {
  product_name: 'testowwq',
  price: 10
} as ProductType;

const productToDelete = {
  product_name: 'testowwqaa',
  price: 10
} as ProductType;

const orderModel = new OrderModel();

const order = {
  status: 'active'
} as OrdertType;

const orderToDelete = {
  status: 'active'
} as OrdertType;

const orderToAddProducts = {
  status: 'active'
} as OrdertType;
// test api routes
describe('test api routes', () => {
  beforeAll(async () => {
    const createUserToDelete = await userModel.createUser(userToDelete);
    userToDelete.id = createUserToDelete.id;

    const createUser = await userModel.createUser(user);
    user.id = createUser.id;
    order.user_id = user.id as unknown as string;
    orderToDelete.user_id = user.id as unknown as string;
    orderToAddProducts.user_id = user.id as unknown as string;

    const createProduct = await productModel.createProduct(product);
    product.id = createProduct.id;

    const createProductToDelete = await productModel.createProduct(
      productToDelete
    );
    productToDelete.id = createProductToDelete.id;

    const createOrder = await orderModel.createOrder(order.user_id);
    order.id = createOrder.id;

    const createOrderToDeleteTest = await orderModel.createOrder(
      orderToDelete.user_id
    );
    orderToDelete.id = createOrderToDeleteTest.id;

    const createOrderToproductsTest = await orderModel.createOrder(
      orderToAddProducts.user_id
    );
    orderToAddProducts.id = createOrderToproductsTest.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const deleteTestDataInproductOrdersTable = 'DELETE FROM order_products;';
    const deleteTestDataInOrderTable = 'DELETE FROM orders;';
    const deleteTestDataInUsersTable = 'DELETE FROM users;';
    const deleteTestDataInProductsTable = 'DELETE FROM Products;';
    await connection.query(deleteTestDataInproductOrdersTable);
    await connection.query(deleteTestDataInOrderTable);
    await connection.query(deleteTestDataInUsersTable);
    await connection.query(deleteTestDataInProductsTable);
    connection.release();
  });

  // user api routes tests
  describe('Test Users CRUD API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .send({
          email: 'test9@test.com',
          first_name: 'userFname9',
          last_name: 'userLname2',
          user_name: 'userName2',
          password: 'test1234'
        } as UserType);
      expect(res.status).toBe(200);
      const { email, user_name, first_name, last_name } = res.body.data;
      expect(email).toBe('test9@test.com');
      expect(first_name).toBe('userFname9');
      expect(last_name).toBe('userLname2');
      expect(user_name).toBe('userName2');
    });

    describe('Test Authenticate methods', () => {
      it('Should Successfully Pass Test if authenticate to get token', async () => {
        const res = await request
          .post('/api/users/authenticate')
          .set('Content-type', 'application/json')
          .send({
            email: 'testw12@test.com',
            password: 'test123'
          });
        expect(res.status).toBe(200);
        const { id, email, token: userToken } = res.body.data;
        expect(id).toBe(user.id);
        expect(email).toBe(user.email);
        token = userToken;
      });

      it('Should Successfully Pass Test if failed to authenticate with wrong email', async () => {
        const res = await request
          .post('/api/users/authenticate')
          .set('Content-type', 'application/json')
          .send({
            email: 'wrongEmail@test.com',
            password: 'test123'
          });
        expect(res.status).toBe(401);
      });
    });

    it('should get list of users', async () => {
      const res = await request
        .get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should get specific user info', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user_name).toBe('userName');
      expect(res.body.data.email).toBe('testw12@test.com');
    });

    it('should update user info', async () => {
      const res = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          first_name: 'firstnameupdated',
          last_name: 'lastnameupdated',
          user_name: 'usernameupdated'
        });
      expect(res.status).toBe(200);
    });

    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${userToDelete.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(userToDelete.id);
    });
  });

  // products api routes tests
  describe('Test Product CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_name: 'test',
          price: 10
        } as ProductType);
      expect(res.status).toBe(200);
    });

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(3);
    });

    it('should get product info', async () => {
      const res = await request
        .get(`/api/users/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update product info', async () => {
      const res = await request
        .patch(`/api/users/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...product,
          product_name: 'test1122',
          price: 102
        });
      expect(res.status).toBe(200);
    });

    it('should delete product', async () => {
      const res = await request
        .delete(`/api/products/${productToDelete.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  //   orders api routes tests
  describe('Test order CRUD API methods', () => {
    it('should create new order', async () => {
      const res = await request
        .post(`/api/orders/create/${user.id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should get list of orders', async () => {
      const res = await request
        .get(`/api/orders/getAll/${user.id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
    });

    it('should get list of active order info', async () => {
      const res = await request
        .get(`/api/orders/active/${user.id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
    });

    it('should update order info', async () => {
      const res = await request
        .patch(`/api/orders/${user.id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: order.id
        });
      expect(res.status).toBe(200);
    });

    it('should get list of complete order info', async () => {
      const res = await request
        .get(`/api/orders/complete/${user.id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.id
        } as OrdertType);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });

    it('should delete order', async () => {
      const res = await request
        .delete(`/api/orders/${user.id}/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: orderToDelete.id
        });
      expect(res.status).toBe(200);
    });
  });

  //   cart api routes tests
  describe('Test cart CRUD API methods', () => {
    it('should create new cart', async () => {
      const res = await request
        .post(`/api/cart/${user.id}/${orderToAddProducts.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_id: product.id,
          quantity: 1
        });
      expect(res.status).toBe(200);
    });

    it('should get list of carts', async () => {
      const res = await request
        .get(`/api/cart/${user.id}/${orderToAddProducts.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });

    it('should update cart info', async () => {
      const res = await request
        .patch(`/api/cart/${user.id}/${orderToAddProducts.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_id: product.id,
          quantity: 12
        });
      expect(res.status).toBe(200);
    });

    it('should delete cart info', async () => {
      const res = await request
        .delete(`/api/cart/${user.id}/${orderToAddProducts.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_id: product.id
        });
      expect(res.status).toBe(200);
    });
  });
});
