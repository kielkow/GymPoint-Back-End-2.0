import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakeHelpOrdersRepository from '../repositories/fakes/FakeHelpOrdersRepository';
import CreateHelpOrderService from './CreateHelpOrderService';
import CreateHelpOrderAnswerService from './CreateHelpOrderAnswerService';

let fakeHelpOrdersRepository: FakeHelpOrdersRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createHelpOrder: CreateHelpOrderService;
let createHelpOrderAnswer: CreateHelpOrderAnswerService;
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

    createHelpOrderAnswer = new CreateHelpOrderAnswerService(
      fakeHelpOrdersRepository,
    );
  });

  it('should be able to respond a helporder', async () => {
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

    const helporderResponded = await createHelpOrderAnswer.execute({
      helporder_id: helporder.id,
      answer: 'This is a helporder answer',
    });

    expect(helporderResponded.answer).toBe('This is a helporder answer');
    expect(helporderResponded.answer_at).toBeDefined();
  });

  it('should not be able to respond a helporder from non existing student', async () => {
    await expect(
      createHelpOrderAnswer.execute({
        helporder_id: 'non-existing-helporder',
        answer: 'This is a helporder answer',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
