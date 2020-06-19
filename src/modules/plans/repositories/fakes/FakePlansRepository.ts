import { uuid } from 'uuidv4';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import ICreatePlanDTO from '@modules/plans/dtos/ICreatePlanDTO';

import AppError from '@shared/errors/AppError';
import Plan from '../../infra/typeorm/entities/Plan';

class FakePlansRepository implements IPlansRepository {
  private plans: Plan[] = [];

  public async find(page = 1, title?: string): Promise<Plan[]> {
    if (title) {
      const findPlansByTitle = this.plans.filter(plan =>
        plan.title.includes(title),
      );

      const skip = (page - 1) * 10;
      const take = skip + 10;

      const findPlans = findPlansByTitle.slice(skip, take);

      return findPlans;
    }

    const skip = (page - 1) * 10;
    const take = skip + 10;

    const findPlans = this.plans.slice(skip, take);

    return findPlans;
  }

  public async findById(id: string): Promise<Plan | undefined> {
    const findPlan = this.plans.find(plan => plan.id === id);

    return findPlan;
  }

  public async findByTitle(title: string): Promise<Plan | undefined> {
    const findPlan = this.plans.find(plan => plan.title === title);

    return findPlan;
  }

  public async create(planData: ICreatePlanDTO): Promise<Plan> {
    const plan = new Plan();

    Object.assign(plan, { id: uuid() }, planData);

    this.plans.push(plan);

    return plan;
  }

  public async save(plan: Plan): Promise<Plan> {
    const findIndex = this.plans.findIndex(findPlan => findPlan.id === plan.id);

    this.plans[findIndex] = plan;

    return plan;
  }

  public async delete(id: string): Promise<void | undefined> {
    const findPlan = this.plans.find(plan => plan.id === id);

    if (!findPlan) throw new AppError('Plan not found');

    const plansNotDeleted = this.plans.filter(plan => plan.id !== id);

    this.plans = plansNotDeleted;
  }
}

export default FakePlansRepository;
