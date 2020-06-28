import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakeHelpOrdersRepository from '../repositories/fakes/FakeHelpOrdersRepository';
import CreateHelpOrderService from './CreateHelpOrderService';
import ListNoAnswerHelpOrdersService from './ListNoAnswerHelpOrdersService';

let fakeHelpOrdersRepository: FakeHelpOrdersRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createHelpOrder: CreateHelpOrderService;
let listNoAnswerHelpOrders: ListNoAnswerHelpOrdersService;
let createStudent: CreateStudentService;

describe('ListNoAnswerHelpOrders', () => {
  beforeEach(() => {
    fakeHelpOrdersRepository = new FakeHelpOrdersRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createHelpOrder = new CreateHelpOrderService(
      fakeStudentsRepository,
      fakeHelpOrdersRepository,
      fakeCacheProvider,
    );

    listNoAnswerHelpOrders = new ListNoAnswerHelpOrdersService(
      fakeHelpOrdersRepository,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list helporders', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const helporder1 = await createHelpOrder.execute({
      student_id: student.id,
      question: 'This is a helporder test question?',
    });

    const helporder2 = await createHelpOrder.execute({
      student_id: student.id,
      question: 'This is a helporder test question?',
    });

    const helporder3 = await createHelpOrder.execute({
      student_id: student.id,
      question: 'This is a helporder test question?',
    });

    const helporders = await listNoAnswerHelpOrders.execute();

    expect(helporders).toEqual([helporder1, helporder2, helporder3]);
  });
});
