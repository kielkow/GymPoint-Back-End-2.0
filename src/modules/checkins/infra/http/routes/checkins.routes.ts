import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CheckinsController from '../controllers/CheckinsController';

const checkinsRouter = Router();

const checkinsController = new CheckinsController();

checkinsRouter.get(
  '/student/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  checkinsController.index,
);

checkinsRouter.post(
  '/student/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  checkinsController.create,
);

export default checkinsRouter;
