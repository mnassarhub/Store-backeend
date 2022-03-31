import { Request, Response } from 'express';
import ProductModel from '../model/product.model';

const productModel = new ProductModel();

// create product
export const createRequestedProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productModel.createProduct(req.body);
    res.json({
      message: 'New product Successfully Created with down data',
      data: { ...newProduct }
    });
    // console.table(newProduct);
  } catch (error) {
    throw error;
  }
};

//    get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.getAllProducts();
    res.json({
      message: 'Products retrived successfuly',
      data: products
    });
    // console.table(products);
  } catch (error) {
    throw error;
  }
};

//    get specific product
export const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.getSpecificProduct(
      req.params.id as unknown as string
    );
    res.json({
      message: 'Product retrived successfuly',
      data: product
    });
    // console.table(product);
  } catch (error) {
    throw error;
  }
};

//    update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.updateProduct(
      req.params.id as unknown as string,
      req.body
    );
    res.json({
      message: 'Product successfuly updated',
      data: product
    });
    // console.table(product);
  } catch (error) {
    throw error;
  }
};

//    delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.deleteProduct(
      req.params.id as unknown as string
    );
    res.json({
      message: 'Product successfuly deleted',
      data: product
    });
    // console.table(product);
  } catch (error) {
    throw error;
  }
};
