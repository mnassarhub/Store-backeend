import db from '../database/database';

export const emailValidator = async (email: string) => {
  const connection = await db.connect();
  const checkemail = await connection.query(
    'SELECT email FROM users WHERE email=($1)',
    [email]
  );
  connection.release();

  if (checkemail.rows[0]) {
    return 'email exist';
  } else {
    return 'new email';
  }
};
