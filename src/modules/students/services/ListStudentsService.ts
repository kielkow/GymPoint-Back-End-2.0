import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRepository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  page: number;
  name?: string;
}

@injectable()
class ListStudentsService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ page, name }: IRequest): Promise<Student[]> {
    const students = await this.studentsRepository.find(page, name);

    if (!students) {
      throw new AppError('Students not found.');
    }

    return students;
  }
}

export default ListStudentsService;
