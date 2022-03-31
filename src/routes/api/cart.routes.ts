import { Router } from 'express';
import * as controllers from '../../controller/orders.controller';
import authentication from '../../middleware/authentication.middleware';

const routes = Router();

routes.get(
  '/:user_id/:order_id',
  authentication,
  controllers.getAllProductsForOrder
);
routes.post(
  '/:user_id/:order_id',
  authentication,
  controllers.addProductToOrder
);
routes.delete(
  '/:user_id/:order_id',
  authentication,
  controllers.deleteProductFromOrder
);
routes.patch(
  '/:user_id/:order_id',
  authentication,
  controllers.updateProductQuantityInOrder
);

export default routes;
