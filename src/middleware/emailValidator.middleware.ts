import db from '../database/database';

export const emailValidator = async (email: string) => {
  const connection = await db.connect();
  const checkEmail = await connection.query(
    'SELECT email FROM users WHERE email=($1)',
    [email]
  );
  connection.release();

  if (checkEmail.rows[0]) {
    return 'email exist';
  } else {
    return 'new email';
  }
};
