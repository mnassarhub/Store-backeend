import OrderType from '../types/order.types';
import ProductOrdersType from '../types/productOrders.type';
import db from '../database/database';

class OrderModel {
  //    create order
  async createOrder(user_id: string): Promise<OrderType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const createOrder = await connection.query(
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *',
        [user_id, 'active']
      );
      // release connection
      connection.release();
      // return created order
      return createOrder.rows[0];
    } catch (error) {
      throw `Unable to create order accourding to ${error}`;
    }
  }

  //    get all orders for user
  async getAllOrders(user_id: string): Promise<OrderType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getActiveOrders = await connection.query(
        'SELECT * FROM orders WHERE user_id = $1 ',
        [user_id]
      );
      connection.release();
      // return all orders
      return getActiveOrders.rows;
    } catch (error) {
      throw `Unable to get all orders for user ${user_id} according to ${error}`;
    }
  }

  //    get all active orders for user (user cart)
  async getActiveOrders(user_id: string): Promise<OrderType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getActiveOrders = await connection.query(
        'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
        [user_id, 'active']
      );
      connection.release();
      // return active orders
      return getActiveOrders.rows;
    } catch (error) {
      throw `Unable to get all active orders for user ${user_id} according to ${error}`;
    }
  }

  //    get all complete orders for user
  async getCompleteOrders(user_id: string): Promise<OrderType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getActiveOrders = await connection.query(
        'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
        [user_id, 'complete']
      );
      connection.release();
      // return complete orders
      return getActiveOrders.rows;
    } catch (error) {
      throw `Unable to get all complete orders for user ${user_id} according to ${error}`;
    }
  }

  //    update order
  async orderCompleted(user_id: string, id: string): Promise<OrderType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const updateOrder = await connection.query(
        'UPDATE orders SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *',
        ['complete', id, user_id]
      );
      // release connection
      connection.release();
      // return updated order
      return updateOrder.rows[0];
    } catch (error) {
      throw `Unable to update order ${id} accourding to ${error}`;
    }
  }

  //    cancel order
  async cancelOrder(user_id: string, id: string): Promise<OrderType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const deleteOrder = await connection.query(
        'DELETE FROM orders WHERE id=($1) AND user_id=($2) AND status=($3) RETURNING *',
        [id, user_id, 'active']
      );
      // release connection
      connection.release();
      // return deleted order
      return deleteOrder.rows[0];
    } catch (error) {
      throw `Unable to delete Order ${id} accourding to ${error}`;
    }
  }

  //   get all products for order
  async getAllProductsForOrder(order_id: string): Promise<ProductOrdersType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getProductsForOrder = await connection.query(
        'SELECT * FROM order_products WHERE order_id = $1',
        [order_id]
      );
      connection.release();
      // return all products for order
      return getProductsForOrder.rows;
    } catch (error) {
      throw `Unable to get all products for order ${order_id} according to ${error}`;
    }
  }

  //    add product to order
  async addProductToOrder(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<ProductOrdersType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const addProductToOrder = await connection.query(
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [order_id, product_id, quantity]
      );
      // release connection
      connection.release();
      // return added product to order
      return addProductToOrder.rows[0];
    } catch (error) {
      throw `Unable to add product to order ${order_id} according to ${error}`;
    }
  }

  //    delete product from order
  async deleteProductFromOrder(
    order_id: string,
    product_id: string
  ): Promise<ProductOrdersType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const deleteProductFromOrder = await connection.query(
        'DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *',
        [order_id, product_id]
      );
      // release connection
      connection.release();
      // return removed product from order
      return deleteProductFromOrder.rows[0];
    } catch (error) {
      throw `Unable to remove product from order ${order_id} according to ${error}`;
    }
  }

  //    update product quantity in order
  async updateProductQuantityInOrder(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<ProductOrdersType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const updateProductQuantityInOrder = await connection.query(
        'UPDATE order_products SET quantity = $1 WHERE order_id = $2 AND product_id = $3 RETURNING *',
        [quantity, order_id, product_id]
      );
      // release connection
      connection.release();
      // return updated product quantity in order
      return updateProductQuantityInOrder.rows[0];
    } catch (error) {
      throw `Unable to update product quantity in order ${order_id} according to ${error}`;
    }
  }
}

export default OrderModel;
