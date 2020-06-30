import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICheckinsRepository from '@modules/checkins/repositories/ICheckinsRepository';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Checkin from '../infra/typeorm/entities/Checkin';

interface IRequest {
  student_id: string;
}
@injectable()
class CreateCheckinService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('CheckinsRepository')
    private checkinsRepository: ICheckinsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ student_id }: IRequest): Promise<Checkin> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const allCheckins = await this.checkinsRepository.find(student_id);

    if (allCheckins.length >= 5) {
      throw new AppError('All checkins used.', 401);
    }

    const checkin = await this.checkinsRepository.create({
      student,
    });

    await this.cacheProvider.invalidatePrefix(
      `student-${student.id}-checkins-list`,
    );

    return checkin;
  }
}

export default CreateCheckinService;
