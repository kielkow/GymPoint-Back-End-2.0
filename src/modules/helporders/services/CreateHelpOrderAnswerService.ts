import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IHelpOrdersRepository from '../repositories/IHelpOrdersRepository';

import HelpOrder from '../infra/typeorm/entities/HelpOrder';

interface IRequest {
  helporder_id: string;
  answer: string;
}

@injectable()
class UpdateHelpOrderService {
  constructor(
    @inject('HelpOrdersRepository')
    private helpordersRepository: IHelpOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ helporder_id, answer }: IRequest): Promise<HelpOrder> {
    const helporder = await this.helpordersRepository.findById(helporder_id);

    if (!helporder) {
      throw new AppError('HelpOrder not found.');
    }

    helporder.answer = answer;
    helporder.answer_at = new Date();

    await this.cacheProvider.invalidatePrefix(
      `student-${helporder.student.id}-helporders-list`,
    );

    return this.helpordersRepository.save(helporder);
  }
}

export default UpdateHelpOrderService;
