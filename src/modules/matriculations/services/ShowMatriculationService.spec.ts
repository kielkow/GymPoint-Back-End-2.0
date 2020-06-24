import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakePlansRepository from '@modules/plans/repositories/fakes/FakePlansRepository';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import CreatePlanService from '@modules/plans/services/CreatePlanService';
import CreateMatriculationService from './CreateMatriculationService';
import ShowMatriculationService from './ShowMatriculationService';

import FakeMatriculationsRepository from '../repositories/fakes/FakeMatriculationsRepository';

let fakeMatriculationsRepository: FakeMatriculationsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePlansRepository: FakePlansRepository;

let fakeCacheProvider: FakeCacheProvider;

let createMatriculation: CreateMatriculationService;
let showMatriculation: ShowMatriculationService;
let createStudent: CreateStudentService;
let createPlan: CreatePlanService;

describe('CreateMatriculation', () => {
  beforeEach(() => {
    fakeMatriculationsRepository = new FakeMatriculationsRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakePlansRepository = new FakePlansRepository();

    fakeCacheProvider = new FakeCacheProvider();

    createMatriculation = new CreateMatriculationService(
      fakeStudentsRepository,
      fakePlansRepository,
      fakeMatriculationsRepository,
      fakeCacheProvider,
    );

    showMatriculation = new ShowMatriculationService(
      fakeMatriculationsRepository,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );

    createPlan = new CreatePlanService(fakePlansRepository, fakeCacheProvider);
  });
  it('should be able to show a matriculation', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const plan = await createPlan.execute({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const matriculation = await createMatriculation.execute({
      student_id: student.id,
      plan_id: plan.id,
      start_date: new Date(),
    });

    const createdMatriculation = await showMatriculation.execute({
      matriculation_id: matriculation.id,
    });

    expect(createdMatriculation).toHaveProperty('id');
  });

  it('should not be able to show a non-existing matriculation', async () => {
    await expect(
      showMatriculation.execute({
        matriculation_id: 'non-existing-matriculation-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
