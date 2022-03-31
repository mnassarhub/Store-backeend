import { Router } from 'express';
import * as controllers from '../../controller/orders.controller';
import authentication from '../../middleware/authentication.middleware';

const routes = Router();

routes.post('/create/:user_id/', authentication, controllers.createOrder);
routes.get('/getAll/:user_id/', authentication, controllers.getAllOrders);
routes.get('/active/:user_id/', authentication, controllers.getAllActiveOrders);
routes.get(
  '/complete/:user_id/',
  authentication,
  controllers.getAllCompleteOrders
);
routes.patch('/:user_id', authentication, controllers.orderCompleted);
routes.delete('/:user_id', authentication, controllers.cancelOrder);

export default routes;
