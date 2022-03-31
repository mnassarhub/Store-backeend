import { Request, Response } from 'express';
import OrderModel from '../model/orders.model';

const orderModel = new OrderModel();

//    create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const createOrder = await orderModel.createOrder(
      req.params.user_id as unknown as string
    );
    res.json({
      message: 'New Order Successfully Created with down data',
      data: createOrder
    });
    console.table(createOrder);
  } catch (error) {
    throw error;
  }
};

//    get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await orderModel.getAllOrders(
      req.params.user_id as unknown as string
    );
    if (allOrders.length === 0) {
      res.json({
        message: 'No orders found',
        data: allOrders
      });
    } else {
      res.json({
        message: 'All Orders retrived successfuly',
        data: allOrders
      });
      console.table(allOrders);
    }
  } catch (error) {
    throw error;
  }
};

//    get all active orders
export const getAllActiveOrders = async (req: Request, res: Response) => {
  try {
    const activeOrders = await orderModel.getActiveOrders(
      req.params.user_id as unknown as string
    );
    if (activeOrders.length === 0) {
      res.json({
        message: 'No Active Orders',
        data: activeOrders
      });
    } else {
      res.json({
        message: 'Active Orders retrived successfuly',
        data: activeOrders
      });
      console.table(activeOrders);
    }
  } catch (error) {
    throw error;
  }
};

//    get all complete orders
export const getAllCompleteOrders = async (req: Request, res: Response) => {
  try {
    const completeOrders = await orderModel.getCompleteOrders(
      req.params.user_id as unknown as string
    );
    if (completeOrders.length === 0) {
      res.json({
        message: 'No Complete Orders',
        data: completeOrders
      });
    } else {
      res.json({
        message: 'Complete Orders retrived successfuly',
        data: completeOrders
      });
      console.table(completeOrders);
    }
  } catch (error) {
    throw error;
  }
};

//    update order
export const orderCompleted = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.orderCompleted(
      req.params.user_id as unknown as string,
      req.body.id as unknown as string
    );
    res.json({
      message: 'Order Successfully Completed',
      data: order
    });
    console.table(order);
  } catch (error) {
    throw error;
  }
};

//    delete order
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await orderModel.cancelOrder(
      req.params.user_id as unknown as string,
      req.body.id as unknown as string
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

//    get all products for order
export const getAllProductsForOrder = async (req: Request, res: Response) => {
  try {
    const allProducts = await orderModel.getAllProductsForOrder(
      req.params.order_id as unknown as string
    );
    if (allProducts.length === 0) {
      res.json({
        message: 'No products found',
        data: allProducts
      });
    } else {
      res.json({
        message: 'All Products retrived successfuly',
        data: allProducts
      });
      console.table(allProducts);
    }
  } catch (error) {
    throw error;
  }
};

//    add product to order
export const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const addedProduct = await orderModel.addProductToOrder(
      req.params.order_id as unknown as string,
      req.body.product_id as unknown as string,
      req.body.quantity as unknown as number
    );
    res.json({
      message: 'Product Successfully Added to Order',
      data: addedProduct
    });
    console.table(addedProduct);
  } catch (error) {
    throw error;
  }
};

//    delete product from order
export const deleteProductFromOrder = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await orderModel.deleteProductFromOrder(
      req.params.order_id as unknown as string,
      req.body.product_id as unknown as string
    );
    res.json({
      message: 'Product Successfully Deleted from Order',
      data: deletedProduct
    });
    console.table(deletedProduct);
  } catch (error) {
    throw error;
  }
};

//    update product quantity in order
export const updateProductQuantityInOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedProduct = await orderModel.updateProductQuantityInOrder(
      req.params.order_id as unknown as string,
      req.body.product_id as unknown as string,
      req.body.quantity as unknown as number
    );
    res.json({
      message: 'Product Quantity Successfully Updated in Order',
      data: updatedProduct
    });
    console.table(updatedProduct);
  } catch (error) {
    throw error;
  }
};
