import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import ICheckinsRepository from '../repositories/ICheckinsRepository';

import Checkin from '../infra/typeorm/entities/Checkin';

interface IRequest {
  student_id: string;
}

@injectable()
class ListCheckinsService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('CheckinsRepository')
    private checkinsRepository: ICheckinsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ student_id }: IRequest): Promise<Checkin[]> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const cacheKey = `student-${student.id}-checkins-list`;

    let checkins = await this.cacheProvider.recover<Checkin[]>(cacheKey);

    if (!checkins) {
      checkins = await this.checkinsRepository.find(student.id);

      if (!checkins) {
        throw new AppError('Checkins not found.');
      }
    }

    return checkins;
  }
}

export default ListCheckinsService;
