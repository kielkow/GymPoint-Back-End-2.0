import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import plansRouter from '@modules/plans/infra/http/routes/plans.routes';
import matriculationsRouter from '@modules/matriculations/infra/http/routes/matriculations.routes';
import checkinsRouter from '@modules/checkins/infra/http/routes/checkins.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/students', studentsRouter);
routes.use('/plans', plansRouter);
routes.use('/matriculations', matriculationsRouter);
routes.use('/checkins', checkinsRouter);

export default routes;
