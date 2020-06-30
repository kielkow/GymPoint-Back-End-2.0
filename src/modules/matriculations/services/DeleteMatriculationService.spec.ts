import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakePlansRepository from '@modules/plans/repositories/fakes/FakePlansRepository';
import CreatePlanService from '@modules/plans/services/CreatePlanService';

import FakeMatriculationsRepository from '../repositories/fakes/FakeMatriculationsRepository';
import CreateMatriculationService from './CreateMatriculationService';
import DeleteMatriculationService from './DeleteMatriculationService';
import ListMatriculationsService from './ListMatriculationsService';

let fakeMatriculationsRepository: FakeMatriculationsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePlansRepository: FakePlansRepository;
let fakeCacheProvider: FakeCacheProvider;

let createMatriculation: CreateMatriculationService;
let deleteMatriculation: DeleteMatriculationService;
let listMatriculations: ListMatriculationsService;

let createStudent: CreateStudentService;
let createPlan: CreatePlanService;

describe('DeleteMatriculation', () => {
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

    deleteMatriculation = new DeleteMatriculationService(
      fakeMatriculationsRepository,
    );

    listMatriculations = new ListMatriculationsService(
      fakeMatriculationsRepository,
      fakeCacheProvider,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );

    createPlan = new CreatePlanService(fakePlansRepository, fakeCacheProvider);
  });

  it('should be able to delete a matriculation', async () => {
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

    await deleteMatriculation.execute({ matriculation_id: matriculation.id });

    const matriculations = await listMatriculations.execute({ page: 1 });

    expect(matriculations).toEqual([]);
  });

  it('should not be able to delete a non-existing matriculation', async () => {
    await expect(
      deleteMatriculation.execute({
        matriculation_id: 'non-existing-matriculation-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
