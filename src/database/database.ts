import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  NODE_ENV,
  POSTGRES_DATABASE,
  POSTGRES_TEST_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT
} = process.env;

console.log(
  `You access ${
    NODE_ENV === 'dev'
      ? 'store_backend database'
      : 'store_backend_test database'
  } `
);

const pool = new Pool({
  database: NODE_ENV === 'dev' ? POSTGRES_DATABASE : POSTGRES_TEST_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string, 10)
});

export default pool;
