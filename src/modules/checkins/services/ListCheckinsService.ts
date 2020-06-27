import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({ student_id }: IRequest): Promise<Checkin[]> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const checkins = await this.checkinsRepository.find(student.id);

    if (!checkins) {
      throw new AppError('Checkins not found.');
    }

    return checkins;
  }
}

export default ListCheckinsService;
