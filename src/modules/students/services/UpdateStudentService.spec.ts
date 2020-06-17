import AppError from '@shared/errors/AppError';

import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import UpdateStudentService from './UpdateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let updateStudent: UpdateStudentService;

describe('UpdateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    updateStudent = new UpdateStudentService(fakeStudentsRepository);
  });

  it('should be able to update the student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const updatedStudent = await updateStudent.execute({
      student_id: student.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      age: 22,
      height: 1.95,
      weight: 73.56,
    });

    expect(updatedStudent.name).toBe('John Tre');
    expect(updatedStudent.email).toBe('johntre@example.com');
  });

  it('should not be able to update the profile from non-existing student', async () => {
    await expect(
      updateStudent.execute({
        student_id: 'non-existing-student-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 20,
        height: 1.82,
        weight: 83.56,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another student email ', async () => {
    await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student = await fakeStudentsRepository.create({
      name: 'Test',
      email: 'test@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await expect(
      updateStudent.execute({
        student_id: student.id,
        name: 'Jonh Doe',
        email: 'johndoe@example.com',
        age: 20,
        height: 1.82,
        weight: 83.56,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
