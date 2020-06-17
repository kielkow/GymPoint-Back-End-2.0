import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
}
@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    age,
    weight,
    height,
  }: IRequest): Promise<Student> {
    const checkStudentexists = await this.studentsRepository.findByEmail(email);

    if (checkStudentexists) throw new AppError('E-mail address already used.');

    const student = await this.studentsRepository.create({
      name,
      email,
      age,
      weight,
      height,
    });

    await this.cacheProvider.invalidatePrefix('students-list');

    return student;
  }
}

export default CreateStudentService;
