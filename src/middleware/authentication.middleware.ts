import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// handle authentication errors
const handleAuthenticationError = (next: NextFunction) => {
  const error = new Error(`Unable to login: pls try again`);
  next(error);
};

// validate token
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticateHeader = req.headers.authorization as unknown as string;
    if (authenticateHeader) {
      const bearer = authenticateHeader.split(' ')[0].toLowerCase();
      const token = authenticateHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const tokenSeecret = process.env.SECRET_TOKEN;
        const decode = jwt.verify(token, tokenSeecret as unknown as string);
        if (decode) {
          next();
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unable to login: pls try again'
          });
        }
      } else {
        res.status(401).json({
          status: 401,
          message: 'Unable to login: pls try again'
        });
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Unable to login: pls try again'
      });
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: 'Unable to login: pls try again'
    });
  }
};

export default validateToken;
