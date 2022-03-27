import ProductType from '../types/product.types';
import db from '../database/database';

class ProductModel {
  // create product
  async createProduct(p: ProductType): Promise<ProductType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const newProduct = await connection.query(
        'INSERT INTO products (productname, price) VALUES ($1, $2) RETURNING *',
        [p.productname, p.price]
      );
      // release connection
      connection.release();
      // return created products
      return newProduct.rows[0];
    } catch (error) {
      throw `Unable to create ${p.productname} accourding to ${error}`;
    }
  }
  //    get all products
  async getAllProducts(): Promise<ProductType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getAllProducts = await connection.query(
        'SELECT id, productname, price FROM products'
      );
      connection.release();
      // return created products
      return getAllProducts.rows;
    } catch (error) {
      throw `Unable to get all products according to ${error}`;
    }
  }
  //    get specific product
  async getSpecificProduct(id: string): Promise<ProductType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getProduct = await connection.query(
        'SELECT * FROM products WHERE id=($1)',
        [id]
      );
      // release connection
      connection.release();
      // return created product
      return getProduct.rows[0];
    } catch (error) {
      throw `Unable to find product ${id} accourding to ${error} `;
    }
  }
  //    update product
  async updateProduct(id: string, p: ProductType): Promise<ProductType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const updateProduct = await connection.query(
        'UPDATE products SET productname=$1, price=$2 WHERE id=$3 RETURNING *',
        [p.productname, p.price, id]
      );
      // release connection
      connection.release();
      // return created product
      return updateProduct.rows[0];
    } catch (error) {
      throw `Unable to update product ${p.productname} accourding to ${error}`;
    }
  }
  //    delete product
  async deleteProduct(id: string): Promise<ProductType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const updateProduct = await connection.query(
        'DELETE FROM products WHERE id=($1) RETURNING *',
        [id]
      );
      // release connection
      connection.release();
      // return created product
      return updateProduct.rows[0];
    } catch (error) {
      throw `Unable to delete product ${id} accourding to ${error}`;
    }
  }
}

export default ProductModel;
