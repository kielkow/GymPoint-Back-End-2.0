import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MatriculationsController from '../controllers/MatriculationsController';

const matriculationsRouter = Router();

const matriculationsController = new MatriculationsController();

// matriculationsRouter.get('/', matriculationsController.index);

matriculationsRouter.get('/:id', matriculationsController.show);

matriculationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      student_id: Joi.string().required(),
      plan_id: Joi.string().required(),
      start_date: Joi.date().required(),
    },
  }),
  matriculationsController.create,
);

// matriculationsRouter.put(
//   '/:id',
//   celebrate({
//     [Segments.BODY]: {
//       plan_id: Joi.string().required(),
//       start_date: Joi.date().required(),
//     },
//   }),
//   matriculationsController.update,
// );

// matriculationsRouter.delete('/:id', matriculationsController.delete);

export default matriculationsRouter;
