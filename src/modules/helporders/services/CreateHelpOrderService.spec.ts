import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakeHelpOrdersRepository from '../repositories/fakes/FakeHelpOrdersRepository';
import CreateHelpOrderService from './CreateHelpOrderService';

let fakeHelpOrdersRepository: FakeHelpOrdersRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createHelpOrder: CreateHelpOrderService;
let createStudent: CreateStudentService;

describe('CreateHelpOrder', () => {
  beforeEach(() => {
    fakeHelpOrdersRepository = new FakeHelpOrdersRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createHelpOrder = new CreateHelpOrderService(
      fakeStudentsRepository,
      fakeHelpOrdersRepository,
      fakeCacheProvider,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new helporder', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const helporder = await createHelpOrder.execute({
      student_id: student.id,
      question: 'This is a helporder test question?',
    });

    expect(helporder).toHaveProperty('id');
  });

  it('should not be able to create a helporder from non existing student', async () => {
    await expect(
      createHelpOrder.execute({
        student_id: 'non-existing-student',
        question: 'This is a helporder test question?',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
