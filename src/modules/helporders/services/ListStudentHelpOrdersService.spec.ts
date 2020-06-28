import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import AppError from '@shared/errors/AppError';

import FakeHelpOrdersRepository from '../repositories/fakes/FakeHelpOrdersRepository';
import CreateHelpOrderService from './CreateHelpOrderService';
import ListStudentHelpOrdersService from './ListStudentHelpOrdersService';

let fakeHelpOrdersRepository: FakeHelpOrdersRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createHelpOrder: CreateHelpOrderService;
let listStudentHelpOrders: ListStudentHelpOrdersService;
let createStudent: CreateStudentService;

describe('ListStudentHelpOrders', () => {
  beforeEach(() => {
    fakeHelpOrdersRepository = new FakeHelpOrdersRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createHelpOrder = new CreateHelpOrderService(
      fakeStudentsRepository,
      fakeHelpOrdersRepository,
      fakeCacheProvider,
    );

    listStudentHelpOrders = new ListStudentHelpOrdersService(
      fakeStudentsRepository,
      fakeHelpOrdersRepository,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list helporders', async () => {
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

    const helporder1 = await createHelpOrder.execute({
      student_id: student1.id,
      question: 'This is a helporder test question?',
    });

    const helporder2 = await createHelpOrder.execute({
      student_id: student1.id,
      question: 'This is a helporder test question?',
    });

    await createHelpOrder.execute({
      student_id: student2.id,
      question: 'This is a helporder test question?',
    });

    const helporders = await listStudentHelpOrders.execute({
      student_id: student1.id,
    });

    expect(helporders).toEqual([helporder1, helporder2]);
  });

  it('should not be able to list helporders from non existing student', async () => {
    await expect(
      listStudentHelpOrders.execute({
        student_id: 'non-existing-student',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
