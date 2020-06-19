import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import ListStudentsService from './ListStudentsService';

let fakeStudentsRepository: FakeStudentsRepository;
let listStudents: ListStudentsService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    listStudents = new ListStudentsService(fakeStudentsRepository);
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

    const students = await listStudents.execute({ page: 1, name: '' });

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
