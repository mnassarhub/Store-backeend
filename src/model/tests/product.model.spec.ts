import ProductType from '../../types/product.types';
import ProductModel from '../product.model';
import db from '../../database/database';

const productModel = new ProductModel();
const product = {
  productname: 'test',
  price: 10
} as ProductType;

describe('product model', () => {
  beforeAll(async () => {
    const createProduct = await productModel.createProduct(product);
    product.id = createProduct.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const deleteTestData = 'DELETE FROM products;';
    await connection.query(deleteTestData);
    connection.release();
  });

  describe('Test methods exists', () => {
    it('Should Successfully Pass Test if createProduct method exists', () => {
      expect(productModel.createProduct).toBeDefined();
    });

    it('Should Successfully Pass Test if getAllProducts method exists', () => {
      expect(productModel.getAllProducts).toBeDefined();
    });

    it('Should Successfully Pass Test if getSpecificProduct method exists', () => {
      expect(productModel.getSpecificProduct).toBeDefined();
    });

    it('Should Successfully Pass Test if updateProduct method exists', () => {
      expect(productModel.updateProduct).toBeDefined();
    });

    it('Should Successfully Pass Test if deleteProduct method exists', () => {
      expect(productModel.deleteProduct).toBeDefined();
    });
  });

  describe('test product model process', () => {
    it('Should Successfully Pass Test return a new product', async () => {
      const createdProduct = await productModel.createProduct({
        productname: 'test1',
        price: 10
      } as ProductType);
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        productname: 'test1',
        price: 10
      } as ProductType);
    });

    it('Should Successfully Pass Test and return all available products in DB', async () => {
      const users = await productModel.getAllProducts();
      expect(users.length).toBe(2);
    });

    it('Should Successfully Pass Test and return testProduct when called with ID', async () => {
      const returnedProduct = await productModel.getSpecificProduct(
        product.id as string
      );
      expect(returnedProduct.id).toBe(product.id);
      expect(returnedProduct.productname).toBe(product.productname);
      expect(returnedProduct.price).toBe(product.price);
    });

    it('Should Successfully Pass Test and delete product from DB', async () => {
      const deletedUser = await productModel.deleteProduct(
        product.id as string
      );
      expect(deletedUser.id).toBe(product.id);
    });
  });
});
