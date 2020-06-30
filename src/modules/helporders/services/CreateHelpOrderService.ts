import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHelpOrdersRepository from '@modules/helporders/repositories/IHelpOrdersRepository';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import HelpOrder from '../infra/typeorm/entities/HelpOrder';

interface IRequest {
  student_id: string;
  question: string;
}

@injectable()
class CreateHelpOrderService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('HelpOrdersRepository')
    private helpordersRepository: IHelpOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ student_id, question }: IRequest): Promise<HelpOrder> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const helporder = await this.helpordersRepository.create({
      student,
      question,
    });

    await this.cacheProvider.invalidatePrefix('helporders-noanswer-list');

    return helporder;
  }
}

export default CreateHelpOrderService;
