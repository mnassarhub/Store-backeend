import { Request, Response } from 'express';
import OrderModel from '../model/orders.model';

const orderModel = new OrderModel();

// create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const createOrder = await orderModel.createOrder(req.body);
    res.json({
      message: 'New Order Successfully Created with down data',
      data: { ...createOrder }
    });
    console.table(createOrder);
  } catch (error) {
    throw error;
  }
};

//    get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.getAllOrders(
      req.params.user_id as unknown as string
    );
    res.json({
      message: 'Orders retrived successfuly',
      data: orders
    });
    console.table(orders);
  } catch (error) {
    throw error;
  }
};

//    get all active orders
export const getAllActiveOrders = async (req: Request, res: Response) => {
  try {
    const status = 'active';
    const activeOrders = await orderModel.getActiveOrders(
      req.params.user_id as unknown as string,
      status
    );
    res.json({
      message: 'Active Orders retrived successfuly',
      data: activeOrders
    });
    console.table(activeOrders);
  } catch (error) {
    throw error;
  }
};

//    get all complete orders
export const getAllCompleteOrders = async (req: Request, res: Response) => {
  try {
    const status = 'complete';
    const completeOrders = await orderModel.getCompleteOrders(
      req.params.user_id as unknown as string,
      status
    );
    res.json({
      message: 'Complete Orders retrived successfuly',
      data: completeOrders
    });
    console.table(completeOrders);
  } catch (error) {
    throw error;
  }
};

//    update order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.updateOrder(
      req.params.user_id as string,
      req.body
    );
    res.json({
      message: 'Order successfuly updated',
      data: order
    });
    console.table(order);
  } catch (error) {
    throw error;
  }
};

//    delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await orderModel.deleteOrder(
      req.params.user_id as string,
      req.query.id as string,
      req.query.status as 'active'
    );
    res.json({
      message: 'Order successfuly deleted',
      data: deletedOrder
    });
    console.table(deletedOrder);
  } catch (error) {
    throw error;
  }
};
