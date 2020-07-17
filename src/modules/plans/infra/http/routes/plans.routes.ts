import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PlansController from '../controllers/PlansController';

const plansRouter = Router();

const plansController = new PlansController();

plansRouter.use(ensureAuthenticated);

plansRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      title: Joi.string(),
    },
  }),
  plansController.index,
);

plansRouter.get('/:id', plansController.show);

plansRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      duration: Joi.number().required(),
      price: Joi.number().required(),
    },
  }),
  plansController.create,
);

plansRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      duration: Joi.number().required(),
      price: Joi.number().required(),
    },
  }),
  plansController.update,
);

plansRouter.delete('/:id', plansController.delete);

export default plansRouter;
