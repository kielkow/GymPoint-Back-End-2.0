import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import HelpOrdersController from '../controllers/HelpOrdersController';

const helpordersRouter = Router();

const helpordersController = new HelpOrdersController();

helpordersRouter.use(ensureAuthenticated);

helpordersRouter.get('/students', helpordersController.index);

helpordersRouter.get(
  '/student/:student_id',
  celebrate({
    [Segments.PARAMS]: {
      student_id: Joi.string().required(),
    },
  }),
  helpordersController.show,
);

helpordersRouter.post(
  '/student/:student_id',
  celebrate({
    [Segments.PARAMS]: {
      student_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      question: Joi.string().required(),
    },
  }),
  helpordersController.create,
);

helpordersRouter.patch(
  '/:helporder_id/answer',
  celebrate({
    [Segments.PARAMS]: {
      helporder_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      answer: Joi.string().required(),
    },
  }),
  helpordersController.update,
);

export default helpordersRouter;
