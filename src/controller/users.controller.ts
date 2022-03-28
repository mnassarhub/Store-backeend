import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { emailValidator } from '../middleware/emailValidator.middleware';

dotenv.config();

const userModel = new UserModel();

// create user
export const createRequestedUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // check if email existed in our database
    if ((await emailValidator(email)) == 'new email') {
      // create new user
      const newUser = await userModel.createUser(req.body);
      res.json({
        message: 'New User Successfully Created with down data',
        data: { ...newUser }
      });
      console.table(newUser);
    } else {
      // if email exists in our database
      res.json({
        message:
          'Email already exists please try to log in, or try another email'
      });
    }
  } catch (error) {
    throw error;
  }
};

//    get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getUsers();
    res.json({
      message: 'Users retrived successfuly',
      data: users
    });
    console.table(users);
  } catch (error) {
    throw error;
  }
};

//    get specific user
export const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.getSpecificUser(
      req.params.id as unknown as string
    );
    res.json({
      message: 'User retrived successfuly',
      data: user
    });
    console.table(user);
  } catch (error) {
    throw error;
  }
};

//    update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.updateUser(
      req.params.id as unknown as string,
      req.body
    );
    res.json({
      message: 'User successfuly updated',
      data: user
    });
    console.table(user);
  } catch (error) {
    throw error;
  }
};

//    delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string);
    res.json({
      message: 'User successfuly deleted',
      data: user
    });
    console.table(user);
  } catch (error) {
    throw error;
  }
};

// authenticate user
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const tokenSeecret = process.env.SECRET_TOKEN;
    const token = jwt.sign({ user }, tokenSeecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Wrong email or password, please try again'
      });
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'user authenticated'
    });
  } catch (error) {
    return next(error);
  }
};
