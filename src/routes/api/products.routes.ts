import { Router } from 'express';
import * as controllers from '../../controller/products.controller';
import authentication from '../../middleware/authentication.middleware';

const routes = Router();

routes.get('/', controllers.getAllProducts);
routes.get('/:id', controllers.getSpecificProduct);
routes.post('/', authentication, controllers.createRequestedProduct);
routes.patch('/:id', authentication, controllers.updateProduct);
routes.delete('/:id', authentication, controllers.deleteProduct);

export default routes;
