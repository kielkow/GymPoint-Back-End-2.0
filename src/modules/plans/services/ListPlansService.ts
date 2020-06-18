import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPlansRepository from '../repositories/IPlansRepository';

import Plan from '../infra/typeorm/entities/Plan';

interface IRequest {
  page: number;
}

@injectable()
class ListPlansService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute({ page }: IRequest): Promise<Plan[]> {
    const plans = await this.plansRepository.find(page);

    if (!plans) {
      throw new AppError('Plans not found.');
    }

    return plans;
  }
}

export default ListPlansService;
