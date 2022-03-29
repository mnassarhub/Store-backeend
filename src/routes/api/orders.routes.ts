import { Router } from 'express';
import * as controllers from '../../controller/orders.controller';
import authentication from '../../middleware/authentication.middleware';

const routes = Router();

routes.post('/', authentication, controllers.createOrder);
routes.get('/:user_id/all_orders/', authentication, controllers.getAllOrders);
routes.get('/:user_id/active/', authentication, controllers.getAllActiveOrders);
routes.get(
  '/:user_id/complete/',
  authentication,
  controllers.getAllCompleteOrders
);
routes.patch('/:user_id', authentication, controllers.updateOrder);
routes.delete('/:user_id', authentication, controllers.deleteOrder);

export default routes;
