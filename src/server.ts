import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/main.routes';
import helmet from 'helmet';
import morgan from 'morgan';

const app: express.Application = express();

app.use(express.json());

// middleware
app.use(helmet());
app.use(morgan('dev'));

// // test database connection and test creating user
// app.post('/add', async (req: Request, res: Response) => {
//   try {
//     const { email, firstName, lastName, userName, password } = req.body;
//     const newUser = await pool.query(
//       'INSERT INTO users (email, firstName, lastName, userName, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [email, firstName, lastName, userName, password]
//     );
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     console.error(err);
//   }
// });

// set server routes
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
app.use('/api', routes);

// handle 404 "page not found error"
app.use(async (_req: Request, res: Response) => {
  res.status(404).send(`Oops Error 404,
    Requested Page Not Found`);
});

// server configurations
dotenv.config();
const port = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log(`starting app on: http://localhost:${port}`);
});

export default app;
