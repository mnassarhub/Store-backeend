import ProductType from '../../types/product.types';
import ProductModel from '../../model/product.model';
import db from '../../database/database';

const productModel = new ProductModel();
const productTest = {
  productname: 'book',
  price: 10
} as ProductType;

describe('product model', () => {
  beforeAll(async () => {
    const createNewProduct = await productModel.createProduct(productTest);
    productTest.id = createNewProduct.id;
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
      const products = await productModel.getAllProducts();
      expect(products.length).toBe(3);
    });

    it('Should Successfully Pass Test and return testProduct when called with ID', async () => {
      const returnedProduct = await productModel.getSpecificProduct(
        productTest.id as string
      );
      expect(returnedProduct.id).toBe(productTest.id);
      expect(returnedProduct.productname).toBe(productTest.productname);
      expect(returnedProduct.price).toBe(productTest.price);
    });

    it('Should Successfully Pass Test and return product with edited attributes', async () => {
      const updatedProduct = await productModel.updateProduct(
        productTest.id as unknown as string,
        {
          ...productTest,
          price: 22
        }
      );
      expect(updatedProduct.id).toBe(productTest.id);
      expect(updatedProduct.productname).toBe(productTest.productname);
      expect(updatedProduct.price).toBe(22);
    });

    it('Should Successfully Pass Test and delete product from DB', async () => {
      const deletedUser = await productModel.deleteProduct(
        productTest.id as string
      );
      expect(deletedUser.id).toBe(productTest.id);
    });
  });
});
