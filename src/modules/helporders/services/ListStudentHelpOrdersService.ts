import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({ student_id }: IRequest): Promise<HelpOrder[]> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const helporders = await this.helpordersRepository.findByStudentId(
      student_id,
    );

    if (!helporders) {
      throw new AppError('HelpOrders not found.');
    }

    return helporders;
  }
}

export default ListStudentHelpOrders;
