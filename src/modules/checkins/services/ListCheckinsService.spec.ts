import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import AppError from '@shared/errors/AppError';

import FakeCheckinsRepository from '../repositories/fakes/FakeCheckinsRepository';
import CreateCheckinService from './CreateCheckinService';
import ListCheckinsService from './ListCheckinsService';

let fakeCheckinsRepository: FakeCheckinsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createCheckin: CreateCheckinService;
let listCheckins: ListCheckinsService;
let createStudent: CreateStudentService;

describe('ListCheckins', () => {
  beforeEach(() => {
    fakeCheckinsRepository = new FakeCheckinsRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createCheckin = new CreateCheckinService(
      fakeStudentsRepository,
      fakeCheckinsRepository,
      fakeCacheProvider,
    );

    listCheckins = new ListCheckinsService(
      fakeStudentsRepository,
      fakeCheckinsRepository,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list checkins', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const checkin1 = await createCheckin.execute({
      student_id: student.id,
    });

    const checkin2 = await createCheckin.execute({
      student_id: student.id,
    });

    const checkin3 = await createCheckin.execute({
      student_id: student.id,
    });

    const checkins = await listCheckins.execute({ student_id: student.id });

    expect(checkins).toEqual([checkin1, checkin2, checkin3]);
  });

  it('should not be able to list the checkins from non existing student', async () => {
    await expect(
      createCheckin.execute({
        student_id: 'non-existing-student',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
