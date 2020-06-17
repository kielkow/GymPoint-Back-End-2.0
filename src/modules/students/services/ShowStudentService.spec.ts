import AppError from '@shared/errors/AppError';

import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import ShowProfileService from './ShowStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    showProfile = new ShowProfileService(fakeStudentsRepository);
  });

  it('should be able to show the student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const profile = await showProfile.execute({
      student_id: student.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile from non-existing student', async () => {
    await expect(
      showProfile.execute({
        student_id: 'non-existing-student-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
