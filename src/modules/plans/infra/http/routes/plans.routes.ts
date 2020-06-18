import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PlansController from '../controllers/PlansController';

const plansRouter = Router();

const plansController = new PlansController();

plansRouter.get('/', plansController.index);

plansRouter.get('/:id', plansController.show);

plansRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      height: Joi.number().required(),
    },
  }),
  plansController.create,
);

plansRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      height: Joi.number().required(),
    },
  }),
  plansController.update,
);

plansRouter.delete('/:id', plansController.delete);

export default plansRouter;
