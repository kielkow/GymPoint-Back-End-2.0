import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPlansRepository from '../repositories/IPlansRepository';

import Plan from '../infra/typeorm/entities/Plan';

interface IRequest {
  plan_id: string;
  title: string;
  duration: number;
  price: number;
}

@injectable()
class UpdatePlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute({
    plan_id,
    title,
    duration,
    price,
  }: IRequest): Promise<Plan> {
    const plan = await this.plansRepository.findById(plan_id);

    if (!plan) {
      throw new AppError('Plan not found.');
    }

    const planWithUpdatedEmail = await this.plansRepository.findByTitle(title);

    if (planWithUpdatedEmail && planWithUpdatedEmail.id !== plan_id) {
      throw new AppError('This title is already used.');
    }

    plan.title = title;
    plan.duration = duration;
    plan.price = price;

    return this.plansRepository.save(plan);
  }
}

export default UpdatePlanService;
