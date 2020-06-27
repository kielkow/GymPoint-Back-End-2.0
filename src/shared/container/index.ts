import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import PlansRepository from '@modules/plans/infra/typeorm/repositories/PlansRepository';

import IMatriculationsRepository from '@modules/matriculations/repositories/IMatriculationsRepository';
import MatriculationsRepository from '@modules/matriculations/infra/typeorm/repositories/MatriculationsRepository';

import ICheckinsRepository from '@modules/checkins/repositories/ICheckinsRepository';
import CheckinsRepository from '@modules/checkins/infra/typeorm/repositories/CheckinsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);

container.registerSingleton<IMatriculationsRepository>(
  'MatriculationsRepository',
  MatriculationsRepository,
);

container.registerSingleton<ICheckinsRepository>(
  'CheckinsRepository',
  CheckinsRepository,
);
