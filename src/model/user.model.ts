import UserType from '../types/user.types';
import db from '../database/database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// function to hash a password
const hash = (password: string) => {
  const salt = parseInt(process.env.SALT_ROUNDS as string, 10);
  return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
};

class UserModel {
  // create user
  async createUser(u: UserType): Promise<UserType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const newUser = await connection.query(
        'INSERT INTO users (email, first_name, last_name, user_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, user_name',
        [u.email, u.first_name, u.last_name, u.user_name, hash(u.password)]
      );
      // release connection
      connection.release();
      // return created user
      return newUser.rows[0];
    } catch (error) {
      throw error;
    }
  }
  //    get all users
  async getUsers(): Promise<UserType[]> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getUsers = await connection.query(
        'SELECT id, email, first_name, last_name, user_name FROM users'
      );
      connection.release();
      // return created user
      return getUsers.rows;
    } catch (error) {
      throw `Unable to get all users according to ${error}`;
    }
  }
  //    get specific user
  async getSpecificUser(id: string): Promise<UserType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const getUser = await connection.query(
        'SELECT id, email, first_name, last_name, user_name FROM users WHERE id=($1)',
        [id]
      );
      // release connection
      connection.release();
      // return created user
      return getUser.rows[0];
    } catch (error) {
      throw `Unable to find user ${id} accourding to ${error} `;
    }
  }
  //    update user
  async updateUser(id: string, u: UserType): Promise<UserType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const updateUser = await connection.query(
        'UPDATE users SET email=$1, first_name=$2, last_name=$3, user_name=$4, password=$5 WHERE id=$6 RETURNING id, email, first_name, last_name, user_name',
        [u.email, u.first_name, u.last_name, u.user_name, hash(u.password), id]
      );
      // release connection
      connection.release();
      // return created user
      return updateUser.rows[0];
    } catch (error) {
      throw `Unable to update user ${u.user_name} accourding to ${error}`;
    }
  }
  //    delete user
  async deleteUser(id: string): Promise<UserType> {
    try {
      // conect with data base and create query
      const connection = await db.connect();
      const deleteUser = await connection.query(
        'DELETE FROM users WHERE id=($1) RETURNING *',
        [id]
      );
      // release connection
      connection.release();
      // return deleted user
      return deleteUser.rows[0];
    } catch (error) {
      throw `Unable to delete user ${id} accourding to ${error}`;
    }
  }
  // authenticate user
  async authenticate(
    email: string,
    password: string
  ): Promise<UserType | null> {
    try {
      const connection = await db.connect();
      const getPassword = await connection.query(
        'SELECT password FROM users WHERE email=($1)',
        [email]
      );
      if (getPassword.rows.length) {
        const { password: hash } = getPassword.rows[0];
        const passwordValidation = bcrypt.compareSync(
          `${password}${process.env.BCRYPT_PASSWORD}`,
          hash
        );
        if (passwordValidation) {
          const userInfo = await connection.query(
            'SELECT id, email, first_name, last_name, user_name FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw `Unable to login accourding to ${error}`;
    }
  }
}

export default UserModel;
