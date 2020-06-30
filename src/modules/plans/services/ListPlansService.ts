import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IPlansRepository from '../repositories/IPlansRepository';

import Plan from '../infra/typeorm/entities/Plan';

interface IRequest {
  page: number;
  title?: string;
}

@injectable()
class ListPlansService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ page = 1, title }: IRequest): Promise<Plan[]> {
    const cacheKey = 'plans-list';

    let plans = await this.cacheProvider.recover<Plan[]>(cacheKey);

    if (!plans) {
      plans = await this.plansRepository.find(page, title);

      if (!plans) {
        throw new AppError('Plans not found.');
      }
    }

    return plans;
  }
}

export default ListPlansService;
