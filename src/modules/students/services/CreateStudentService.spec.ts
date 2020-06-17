import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import CreateStudentService from './CreateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createStudent: CreateStudentService;

describe('CreateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new student', async () => {
    const student = await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    expect(student).toHaveProperty('id');
  });

  it('should not be able to create a new student with same e-mail from another', async () => {
    await createStudent.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await expect(
      createStudent.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 20,
        height: 1.82,
        weight: 83.56,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
