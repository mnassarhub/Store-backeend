import OrderType from '../types/order.types';
import db from '../database/database';

class OrderModel {
  // create order
  async createOrder(o: OrderType): Promise<OrderType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const createOrder = await connection.query(
        'INSERT INTO orders (user_id, quantity, product_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [o.user_id, o.quantity, o.product_id, o.status]
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
  async getActiveOrders(
    user_id: string,
    status: 'active'
  ): Promise<OrderType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getActiveOrders = await connection.query(
        'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
        [user_id, status]
      );
      connection.release();
      // return active orders
      return getActiveOrders.rows;
    } catch (error) {
      throw `Unable to get all active orders for user ${user_id} according to ${error}`;
    }
  }
  //    get all complete orders for user
  async getCompleteOrders(
    user_id: string,
    status: 'complete'
  ): Promise<OrderType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getActiveOrders = await connection.query(
        'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
        [user_id, status]
      );
      connection.release();
      // return complete orders
      return getActiveOrders.rows;
    } catch (error) {
      throw `Unable to get all complete orders for user ${user_id} according to ${error}`;
    }
  }
  //    update order
  async updateOrder(user_id: string, o: OrderType): Promise<OrderType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const updateOrder = await connection.query(
        'UPDATE orders SET quantity=$1, product_id=$2 WHERE id=$3 AND user_id=$4 AND status=$5 RETURNING *',
        [o.quantity, o.product_id, o.id, user_id, o.status]
      );
      // release connection
      connection.release();
      // return updated order
      return updateOrder.rows[0];
    } catch (error) {
      throw `Unable to update order ${o.id} accourding to ${error}`;
    }
  }
  //    delete order
  async deleteOrder(
    user_id: string,
    id: string,
    status: 'active'
  ): Promise<OrderType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const deleteOrder = await connection.query(
        'DELETE FROM orders WHERE id=($1) AND user_id=($2) AND status=($3) RETURNING *',
        [id, user_id, status]
      );
      // release connection
      connection.release();
      // return deleted order
      return deleteOrder.rows[0];
    } catch (error) {
      throw `Unable to delete Order ${id} accourding to ${error}`;
    }
  }
}

export default OrderModel;
