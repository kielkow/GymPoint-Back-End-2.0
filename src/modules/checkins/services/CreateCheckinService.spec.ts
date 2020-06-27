import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from '@modules/students/services/CreateStudentService';

import FakeCheckinsRepository from '../repositories/fakes/FakeCheckinsRepository';
import CreateCheckinService from './CreateCheckinService';

let fakeCheckinsRepository: FakeCheckinsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createCheckin: CreateCheckinService;
let createStudent: CreateStudentService;

describe('CreateCheckin', () => {
  beforeEach(() => {
    fakeCheckinsRepository = new FakeCheckinsRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createCheckin = new CreateCheckinService(
      fakeStudentsRepository,
      fakeCheckinsRepository,
      fakeCacheProvider,
    );

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new checkin', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const checkin = await createCheckin.execute({
      student_id: student.id,
    });

    expect(checkin).toHaveProperty('id');
  });

  it('should not be able to create checkin from non existing student', async () => {
    await expect(
      createCheckin.execute({
        student_id: 'non-existing-student',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create more than five checkins', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await createCheckin.execute({
      student_id: student.id,
    });

    await createCheckin.execute({
      student_id: student.id,
    });

    await createCheckin.execute({
      student_id: student.id,
    });

    await createCheckin.execute({
      student_id: student.id,
    });

    await createCheckin.execute({
      student_id: student.id,
    });

    await expect(
      createCheckin.execute({
        student_id: student.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
