import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import StudentsController from '../controllers/StudentsController';
import StudentAvatarController from '../controllers/StudentAvatarController';

const studentsRouter = Router();
const upload = multer(uploadConfig.multer);

const studentsController = new StudentsController();
const studentAvatarController = new StudentAvatarController();

studentsRouter.get('/', studentsController.index);

studentsRouter.get('/:id', studentsController.show);

studentsRouter.post(
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
  studentsController.create,
);

studentsRouter.put(
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
  studentsController.update,
);

studentsRouter.patch(
  '/avatar/:id',
  upload.single('avatar'),
  studentAvatarController.update,
);

export default studentsRouter;
