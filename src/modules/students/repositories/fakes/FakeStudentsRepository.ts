import { uuid } from 'uuidv4';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';

import Student from '../../infra/typeorm/entities/Student';

class FakeStudentsRepository implements IStudentsRepository {
  private students: Student[] = [];

  public async find(page = 1, name?: string): Promise<Student[]> {
    if (name) {
      const skip = (page - 1) * 10;
      const take = skip + 10;

      const findStudents = this.students.slice(skip, take);

      const findStudentsWithName = findStudents.filter(student =>
        student.name.includes(name),
      );

      return findStudentsWithName;
    }

    const skip = (page - 1) * 10;
    const take = skip + 10;

    const findStudents = this.students.slice(skip, take);

    return findStudents;
  }

  public async findById(id: string): Promise<Student | undefined> {
    const findStudent = this.students.find(student => student.id === id);

    return findStudent;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const findStudent = this.students.find(student => student.email === email);

    return findStudent;
  }

  public async findAllByName(name: string): Promise<Student[]> {
    let { students } = this;

    if (name) {
      students = students.filter(student => student.name.includes(name));
    }

    return students;
  }

  public async create(studentData: ICreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, { id: uuid() }, studentData);

    this.students.push(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    const findIndex = this.students.findIndex(
      findStudent => findStudent.id === student.id,
    );

    this.students[findIndex] = student;

    return student;
  }
}

export default FakeStudentsRepository;
