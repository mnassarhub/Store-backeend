import UserType from '../../types/user.types';
import UserModel from '../../model/user.model';
import ProductType from '../../types/product.types';
import ProductModel from '../../model/product.model';
import db from '../../database/database';

const userModel = new UserModel();
const user = {
  email: 'test@test.com',
  firstname: 'userFname',
  lastname: 'userLname',
  username: 'userName',
  password: 'test123'
} as UserType;

describe('user model', () => {
  beforeAll(async () => {
    const createUser = await userModel.createUser(user);
    user.id = createUser.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const deleteTestData = 'DELETE FROM users;';
    await connection.query(deleteTestData);
    connection.release();
  });

  describe('Test methods exists', () => {
    it('Should Successfully Pass Test if createUser method exists', () => {
      expect(userModel.createUser).toBeDefined();
    });

    it('Should Successfully Pass Test if getUsers method exists', () => {
      expect(userModel.getUsers).toBeDefined();
    });

    it('Should Successfully Pass Test if getSpecificUser method exists', () => {
      expect(userModel.getSpecificUser).toBeDefined();
    });

    it('Should Successfully Pass Test if updateUser method exists', () => {
      expect(userModel.updateUser).toBeDefined();
    });

    it('Should Successfully Pass Test if deleteUser method exists', () => {
      expect(userModel.deleteUser).toBeDefined();
    });

    it('Should Successfully Pass Test if authenticate method exists', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('test authenticate process', () => {
    it('Should Successfully Pass Test if return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.email,
        user.password as string
      );
      expect(authenticatedUser?.email).toBe(user.email);
      expect(authenticatedUser?.firstname).toBe(user.firstname);
      expect(authenticatedUser?.lastname).toBe(user.lastname);
      expect(authenticatedUser?.username).toBe(user.username);
    });

    it('Should Successfully Pass Test if return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate(
        'wrongTest@test.com',
        'Wrongpassword'
      );
      expect(authenticatedUser).toBe(null);
    });
  });

  describe('test user model process', () => {
    it('Should Successfully Pass Test return a new user', async () => {
      const createdUser = await userModel.createUser({
        email: 'create_test@test.com',
        firstname: 'userFname1',
        lastname: 'userLname1',
        username: 'userName1',
        password: 'test123'
      } as UserType);
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'create_test@test.com',
        firstname: 'userFname1',
        lastname: 'userLname1',
        username: 'userName1'
      } as UserType);
    });

    it('Should Successfully Pass Test and return all available users in DB', async () => {
      const users = await userModel.getUsers();
      expect(users.length).toBe(2);
    });

    it('Should Successfully Pass Test and return testUser when called with ID', async () => {
      const returnedUser = await userModel.getSpecificUser(user.id as string);
      expect(returnedUser.id).toBe(user.id);
      expect(returnedUser.email).toBe(user.email);
      expect(returnedUser.firstname).toBe(user.firstname);
      expect(returnedUser.lastname).toBe(user.lastname);
      expect(returnedUser.username).toBe(user.username);
    });

    it('Should Successfully Pass Test and return user with edited attributes', async () => {
      const updatedUser = await userModel.updateUser(
        user.id as unknown as string,
        {
          ...user,
          email: 'test22@test.com',
          firstname: 'userFname22',
          lastname: 'userLname22',
          username: 'userName22',
          password: 'test12322'
        }
      );
      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.email).toBe('test22@test.com');
      expect(updatedUser.firstname).toBe('userFname22');
      expect(updatedUser.lastname).toBe('userLname22');
      expect(updatedUser.username).toBe('userName22');
    });

    it('Should Successfully Pass Test and delete user from DB', async () => {
      const deletedUser = await userModel.deleteUser(user.id as string);
      expect(deletedUser.id).toBe(user.id);
    });
  });
});
