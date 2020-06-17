import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import UpdateStudentAvatarService from './UpdateStudentAvatarService';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateStudentAvatar: UpdateStudentAvatarService;

describe('UpdateStudentAvatar', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateStudentAvatar = new UpdateStudentAvatarService(
      fakeStudentsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update a new student avatar', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await updateStudentAvatar.execute({
      student_id: student.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(student.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing student', async () => {
    await expect(
      updateStudentAvatar.execute({
        student_id: 'non-existing-student',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar on update a new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await updateStudentAvatar.execute({
      student_id: student.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateStudentAvatar.execute({
      student_id: student.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(student.avatar).toBe('avatar2.jpg');
  });
});
