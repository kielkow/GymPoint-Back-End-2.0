import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakePlansRepository from '@modules/plans/repositories/fakes/FakePlansRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import CreatePlanService from '@modules/plans/services/CreatePlanService';

import FakeMatriculationsRepository from '../repositories/fakes/FakeMatriculationsRepository';
import CreateMatriculationService from './CreateMatriculationService';
import SendMailMatriculationSuccess from './SendMailMatriculationSuccess';

let fakeMatriculationsRepository: FakeMatriculationsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePlansRepository: FakePlansRepository;
let fakeCacheProvider: FakeCacheProvider;

let sendMailMatriculationSuccess: SendMailMatriculationSuccess;
let createMatriculation: CreateMatriculationService;
let createStudent: CreateStudentService;
let createPlan: CreatePlanService;

describe('SendMailMatriculationSuccess', () => {
  beforeEach(() => {
    fakeMatriculationsRepository = new FakeMatriculationsRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakePlansRepository = new FakePlansRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeMailProvider = new FakeMailProvider();

    sendMailMatriculationSuccess = new SendMailMatriculationSuccess(
      fakeMatriculationsRepository,
      fakeMailProvider,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );

    createPlan = new CreatePlanService(fakePlansRepository, fakeCacheProvider);

    createMatriculation = new CreateMatriculationService(
      fakeStudentsRepository,
      fakePlansRepository,
      fakeMatriculationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to send mail of matriculation success', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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

    await sendMailMatriculationSuccess.execute({
      matriculation_id: matriculation.id,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send mail matriculation success from a non-existing matriculation', async () => {
    await expect(
      sendMailMatriculationSuccess.execute({
        matriculation_id: 'non-existing-matriculation-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
