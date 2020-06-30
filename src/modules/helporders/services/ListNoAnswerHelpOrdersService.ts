import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IHelpOrdersRepository from '../repositories/IHelpOrdersRepository';

import HelpOrder from '../infra/typeorm/entities/HelpOrder';

@injectable()
class ListNoAnswerHelpOrdersService {
  constructor(
    @inject('HelpOrdersRepository')
    private helpordersRepository: IHelpOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(page = 1): Promise<HelpOrder[]> {
    const cacheKey = 'helporders-noanswer-list';

    let helporders = await this.cacheProvider.recover<HelpOrder[]>(cacheKey);

    if (!helporders) {
      helporders = await this.helpordersRepository.find(page);

      if (!helporders) {
        throw new AppError('HelpOrders not found.');
      }
    }

    return helporders;
  }
}

export default ListNoAnswerHelpOrdersService;
