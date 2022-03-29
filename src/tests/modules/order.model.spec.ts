import OrdertType from '../../types/order.types';
import OrderModel from '../../model/orders.model';
import UserType from '../../types/user.types';
import UserModel from '../../model/user.model';
import ProductType from '../../types/product.types';
import ProductModel from '../../model/product.model';
import db from '../../database/database';

const userModel = new UserModel();
const user = {
  email: 'testo@test.com',
  firstname: 'userFnameo',
  lastname: 'userLnameo',
  username: 'userNameo',
  password: 'test123o'
} as UserType;

const productModel = new ProductModel();
const product = {
  productname: 'testo',
  price: 10
} as ProductType;

const orderModel = new OrderModel();

const order = {
  user_id: user.id,
  quantity: 1,
  product_id: product.id,
  status: 'active'
} as OrdertType;

describe('order model', () => {
  beforeAll(async () => {
    const createUser = await userModel.createUser(user);
    user.id = createUser.id;

    const createProduct = await productModel.createProduct(product);
    product.id = createProduct.id;

    const createOrder = await orderModel.createOrder(order);
    order.id = createOrder.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const deleteTestData = 'DELETE FROM orders;';
    await connection.query(deleteTestData);
    connection.release();
  });

  describe('Test methods exists', () => {
    it('Should Successfully Pass Test if createOrder method exists', () => {
      expect(orderModel.createOrder).toBeDefined();
    });

    it('Should Successfully Pass Test if getAllOrders method exists', () => {
      expect(orderModel.getAllOrders).toBeDefined();
    });

    it('Should Successfully Pass Test if getActiveOrders method exists', () => {
      expect(orderModel.getActiveOrders).toBeDefined();
    });

    it('Should Successfully Pass Test if getCompleteOrders method exists', () => {
      expect(orderModel.getCompleteOrders).toBeDefined();
    });

    it('Should Successfully Pass Test if updateOrder method exists', () => {
      expect(orderModel.updateOrder).toBeDefined();
    });

    it('Should Successfully Pass Test if deleteOrder method exists', () => {
      expect(orderModel.deleteOrder).toBeDefined();
    });
  });

  describe('test order model process', () => {
    it('Should Successfully Pass Test return a new order', async () => {
      const createdorder = await orderModel.createOrder({
        user_id: user.id,
        quantity: 16,
        product_id: product.id,
        status: 'active'
      } as OrdertType);
      expect(createdorder).toEqual({
        id: createdorder.id,
        user_id: user.id,
        quantity: 16,
        product_id: product.id,
        status: 'active'
      } as OrdertType);
    });

    it('Should Successfully Pass Test and return all available orders in DB', async () => {
      const orders = await orderModel.getAllOrders(user.id as string);
      expect(orders.length).toBe(1);
    });

    it('Should Successfully Pass Test and return active orders when called with ID', async () => {
      const activeOrder = await orderModel.getActiveOrders(
        user.id as string,
        'active'
      );
      expect(activeOrder.length).toBe(1);
    });

    it('Should Successfully Pass Test and return complete orders when called with ID', async () => {
      const activeComplete = await orderModel.getCompleteOrders(
        user.id as string,
        'complete'
      );
      expect(activeComplete.length).toBe(0);
    });
  });
});
