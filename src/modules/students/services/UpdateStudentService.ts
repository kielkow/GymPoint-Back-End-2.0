import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRepository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  student_id: string;
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
}

@injectable()
class UpdateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({
    student_id,
    name,
    email,
    age,
    height,
    weight,
  }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found.');
    }

    const studentWithUpdatedEmail = await this.studentsRepository.findByEmail(
      email,
    );

    if (studentWithUpdatedEmail && studentWithUpdatedEmail.id !== student_id) {
      throw new AppError('This e-mail is already used.');
    }

    student.name = name;
    student.email = email;
    student.age = age;
    student.height = height;
    student.weight = weight;

    return this.studentsRepository.save(student);
  }
}

export default UpdateStudentService;
