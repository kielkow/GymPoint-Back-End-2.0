import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakePlansRepository from '@modules/plans/repositories/fakes/FakePlansRepository';
import CreatePlanService from '@modules/plans/services/CreatePlanService';

import FakeMatriculationsRepository from '../repositories/fakes/FakeMatriculationsRepository';
import CreateMatriculationService from './CreateMatriculationService';
import ListMatriculationsService from './ListMatriculationsService';

let fakeMatriculationsRepository: FakeMatriculationsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePlansRepository: FakePlansRepository;
let fakeCacheProvider: FakeCacheProvider;

let createMatriculation: CreateMatriculationService;
let listMatriculations: ListMatriculationsService;
let createStudent: CreateStudentService;
let createPlan: CreatePlanService;

describe('ListMatriculations', () => {
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

  it('should be able to list matriculations', async () => {
    const student1 = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student2 = await createStudent.execute({
      name: 'John Tre',
      email: 'johntre@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student3 = await createStudent.execute({
      name: 'John Quo',
      email: 'johnquo@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const plan1 = await createPlan.execute({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const plan2 = await createPlan.execute({
      title: 'Gold',
      duration: 6,
      price: 200,
    });

    const plan3 = await createPlan.execute({
      title: 'Black',
      duration: 6,
      price: 200,
    });

    const matriculation1 = await createMatriculation.execute({
      student_id: student1.id,
      plan_id: plan1.id,
      start_date: new Date(),
    });

    const matriculation2 = await createMatriculation.execute({
      student_id: student2.id,
      plan_id: plan2.id,
      start_date: new Date(),
    });

    const matriculation3 = await createMatriculation.execute({
      student_id: student3.id,
      plan_id: plan3.id,
      start_date: new Date(),
    });

    const matriculations = await listMatriculations.execute({ page: 1 });

    expect(matriculations).toEqual([
      matriculation1,
      matriculation2,
      matriculation3,
    ]);
  });

  it('should be able to list the matriculations by specific student name', async () => {
    const student1 = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student2 = await createStudent.execute({
      name: 'John Tre',
      email: 'johntre@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student3 = await createStudent.execute({
      name: 'John Quo',
      email: 'johnquo@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const plan1 = await createPlan.execute({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const plan2 = await createPlan.execute({
      title: 'Gold',
      duration: 6,
      price: 200,
    });

    const plan3 = await createPlan.execute({
      title: 'Black',
      duration: 6,
      price: 200,
    });

    const matriculation1 = await createMatriculation.execute({
      student_id: student1.id,
      plan_id: plan1.id,
      start_date: new Date(),
    });

    await createMatriculation.execute({
      student_id: student2.id,
      plan_id: plan2.id,
      start_date: new Date(),
    });

    await createMatriculation.execute({
      student_id: student3.id,
      plan_id: plan3.id,
      start_date: new Date(),
    });

    const matriculations = await listMatriculations.execute({
      page: 1,
      student_name: 'John Doe',
    });

    expect(matriculations).toEqual([matriculation1]);
  });
});
