import { Router } from 'express';
import * as controllers from '../../controller/users.controller';
import authentication from '../../middleware/authentication.middleware';

const routes = Router();

routes.get('/', authentication, controllers.getUsers);
routes.get('/:id', authentication, controllers.getSpecificUser);
routes.post('/', controllers.createRequestedUser);
routes.patch('/:id', authentication, controllers.updateUser);
routes.delete('/:id', authentication, controllers.deleteUser);
// authentication
routes.route('/authenticate').post(controllers.authenticate);

export default routes;
