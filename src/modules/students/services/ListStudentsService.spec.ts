import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import ListStudentsService from './ListStudentsService';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listStudents: ListStudentsService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listStudents = new ListStudentsService(
      fakeStudentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the students', async () => {
    const student1 = await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johntre@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student2 = await fakeStudentsRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const student3 = await fakeStudentsRepository.create({
      name: 'John Quo',
      email: 'johnquo@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const students = await listStudents.execute({ page: 1 });

    expect(students).toEqual([student1, student2, student3]);
  });

  it('should be able to list the students with specific name', async () => {
    const student1 = await fakeStudentsRepository.create({
      name: 'John Doe',
      email: 'johntre@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await fakeStudentsRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    await fakeStudentsRepository.create({
      name: 'John Quo',
      email: 'johnquo@example.com',
      age: 20,
      height: 1.82,
      weight: 83.56,
    });

    const students = await listStudents.execute({ page: 1, name: 'John Doe' });

    expect(students).toEqual([student1]);
  });
});
