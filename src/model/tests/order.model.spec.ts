import OrdertType from '../../types/order.types';
import OrderModel from '../orders.model';
import db from '../../database/database';

const orderModel = new OrderModel();

describe('order model', () => {
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
});
