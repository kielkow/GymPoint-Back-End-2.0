import { getRepository, Repository, Like } from 'typeorm';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';

import Student from '../entities/Student';

class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async find(page = 1, name?: string): Promise<Student[]> {
    if (name) {
      const students = await this.ormRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      return students;
    }

    const students = await this.ormRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });

    return students;
  }

  public async findById(id: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne(id);

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({ where: { email } });

    return student;
  }

  public async findAllByName(name: string): Promise<Student[]> {
    let students: Student[];

    if (name) {
      students = await this.ormRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
      });
    } else {
      students = [];
    }

    return students;
  }

  public async create(studentData: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create(studentData);

    await this.ormRepository.save(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    return this.ormRepository.save(student);
  }
}

export default StudentsRepository;
