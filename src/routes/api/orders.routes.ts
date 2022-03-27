import { Router } from 'express';
import * as controllers from '../../controller/orders.conteollers';
import authentication from '../../middleware/authentication.middleware';

const routes = Router();

routes.post('/', authentication, controllers.createOrder);
routes.get('/all_orders/:user_id', authentication, controllers.getAllOrders);
routes.get(
  '/active_orders/:user_id',
  authentication,
  controllers.getAllActiveOrders
);
routes.get(
  '/complete_orders/:user_id',
  authentication,
  controllers.getAllCompleteOrders
);
routes.patch('/:user_id', authentication, controllers.updateOrder);
routes.delete('/:user_id', authentication, controllers.deleteOrder);

export default routes;
