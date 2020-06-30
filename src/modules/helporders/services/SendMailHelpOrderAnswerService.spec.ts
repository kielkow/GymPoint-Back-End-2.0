import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakeHelpOrdersRepository from '../repositories/fakes/FakeHelpOrdersRepository';
import CreateHelpOrderService from './CreateHelpOrderService';
import CreateHelpOrderAnswerService from './CreateHelpOrderAnswerService';
import SendMailHelpOrderAnswerService from './SendMailHelpOrderAnswerService';

let fakeHelpOrdersRepository: FakeHelpOrdersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let sendMailHelpOrderAnswer: SendMailHelpOrderAnswerService;
let createHelpOrder: CreateHelpOrderService;
let createHelpOrderAnswer: CreateHelpOrderAnswerService;
let createStudent: CreateStudentService;

describe('SendMailHelpOrderAnswer', () => {
  beforeEach(() => {
    fakeHelpOrdersRepository = new FakeHelpOrdersRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeMailProvider = new FakeMailProvider();

    sendMailHelpOrderAnswer = new SendMailHelpOrderAnswerService(
      fakeHelpOrdersRepository,
      fakeMailProvider,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );

    createHelpOrder = new CreateHelpOrderService(
      fakeStudentsRepository,
      fakeHelpOrdersRepository,
      fakeCacheProvider,
    );

    createHelpOrderAnswer = new CreateHelpOrderAnswerService(
      fakeHelpOrdersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to send mail with the answer about helporder question', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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

    await sendMailHelpOrderAnswer.execute({
      helporder_id: helporderResponded.id,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send mail helporder answer from a non-existing helporder', async () => {
    await expect(
      sendMailHelpOrderAnswer.execute({
        helporder_id: 'non-existing-helporder-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
