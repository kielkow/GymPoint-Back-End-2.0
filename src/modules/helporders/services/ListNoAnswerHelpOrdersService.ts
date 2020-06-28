import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHelpOrdersRepository from '../repositories/IHelpOrdersRepository';

import HelpOrder from '../infra/typeorm/entities/HelpOrder';

@injectable()
class ListNoAnswerHelpOrdersService {
  constructor(
    @inject('HelpOrdersRepository')
    private helpordersRepository: IHelpOrdersRepository,
  ) {}

  public async execute(page = 1): Promise<HelpOrder[]> {
    const helporders = await this.helpordersRepository.find(page);

    if (!helporders) {
      throw new AppError('HelpOrders not found.');
    }

    return helporders;
  }
}

export default ListNoAnswerHelpOrdersService;
