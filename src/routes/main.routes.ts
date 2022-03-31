import { Router } from 'express';
import userRoutes from './api/users.routes';
import productRoutes from './api/products.routes';
import orderRoutes from './api/orders.routes';
import cartRoutes from './api/cart.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes);
routes.use('/cart', cartRoutes);

export default routes;
