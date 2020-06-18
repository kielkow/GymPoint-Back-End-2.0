import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPlansRepository from '@modules/plans/repositories/IPlansRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Plan from '../infra/typeorm/entities/Plan';

interface IRequest {
  title: string;
  duration: number;
  price: number;
}
@injectable()
class CreatePlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ title, duration, price }: IRequest): Promise<Plan> {
    const checkPlanexists = await this.plansRepository.findByTitle(title);

    if (checkPlanexists) throw new AppError('Title already used.');

    const plan = await this.plansRepository.create({
      title,
      duration,
      price,
    });

    await this.cacheProvider.invalidatePrefix('plans-list');

    return plan;
  }
}

export default CreatePlanService;
