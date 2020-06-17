import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRepository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  student_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ student_id }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found.');
    }

    return student;
  }
}

export default ShowProfileService;
