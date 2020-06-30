import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IHelpOrdersRepository from '../repositories/IHelpOrdersRepository';

import HelpOrder from '../infra/typeorm/entities/HelpOrder';

interface IRequest {
  student_id: string;
}

@injectable()
class ListStudentHelpOrders {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('HelpOrdersRepository')
    private helpordersRepository: IHelpOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ student_id }: IRequest): Promise<HelpOrder[]> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const cacheKey = `student-${student.id}-helporders-list`;

    const helpordersFromCache = await this.cacheProvider.recover<HelpOrder[]>(
      cacheKey,
    );

    if (!helpordersFromCache) {
      const helporders = await this.helpordersRepository.findByStudentId(
        student_id,
      );

      if (!helporders) {
        throw new AppError('HelpOrders not found.');
      }

      return helporders;
    }

    return helpordersFromCache;
  }
}

export default ListStudentHelpOrders;
