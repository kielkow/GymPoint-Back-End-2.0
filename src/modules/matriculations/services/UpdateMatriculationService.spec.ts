import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakePlansRepository from '@modules/plans/repositories/fakes/FakePlansRepository';
import CreatePlanService from '@modules/plans/services/CreatePlanService';

import FakeMatriculationsRepository from '../repositories/fakes/FakeMatriculationsRepository';
import CreateMatriculationService from './CreateMatriculationService';
import UpdateMatriculationService from './UpdateMatriculationService';

let fakeMatriculationsRepository: FakeMatriculationsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePlansRepository: FakePlansRepository;
let fakeCacheProvider: FakeCacheProvider;

let createMatriculation: CreateMatriculationService;
let updateMatriculation: UpdateMatriculationService;
let createStudent: CreateStudentService;
let createPlan: CreatePlanService;

describe('UpdateMatriculation', () => {
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

    updateMatriculation = new UpdateMatriculationService(
      fakeMatriculationsRepository,
      fakePlansRepository,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );

    createPlan = new CreatePlanService(fakePlansRepository, fakeCacheProvider);
  });

  it('should be able to update a matriculation', async () => {
    const student1 = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const plan1 = await createPlan.execute({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const matriculation = await createMatriculation.execute({
      student_id: student1.id,
      plan_id: plan1.id,
      start_date: new Date(),
    });

    const plan2 = await createPlan.execute({
      title: 'Black',
      duration: 6,
      price: 200,
    });

    const updatedDate = new Date();

    const updatedMatriculation = await updateMatriculation.execute({
      matriculation_id: matriculation.id,
      plan_id: plan2.id,
      start_date: updatedDate,
    });

    expect(updatedMatriculation.plan).toBe(plan2);
    expect(updatedMatriculation.start_date).toBe(updatedDate);
  });

  it('should not be able to update non-existing matriculation', async () => {
    await expect(
      updateMatriculation.execute({
        matriculation_id: 'non-existing-matriculation-id',
        plan_id: 'plan-id',
        start_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
