import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ page, name }: IRequest): Promise<Student[]> {
    const cacheKey = 'students-list';

    let students = await this.cacheProvider.recover<Student[]>(cacheKey);

    if (!students) {
      students = await this.studentsRepository.find(page, name);

      if (!students) {
        throw new AppError('Students not found.');
      }
    }

    return students;
  }
}

export default ListStudentsService;
