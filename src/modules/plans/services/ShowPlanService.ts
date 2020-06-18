import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPlansRepository from '../repositories/IPlansRepository';

import Plan from '../infra/typeorm/entities/Plan';

interface IRequest {
  plan_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute({ plan_id }: IRequest): Promise<Plan> {
    const plan = await this.plansRepository.findById(plan_id);

    if (!plan) {
      throw new AppError('Plan not found.');
    }

    return plan;
  }
}

export default ShowProfileService;
