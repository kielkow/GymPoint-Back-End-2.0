import { getRepository, Repository, Like } from 'typeorm';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import ICreatePlanDTO from '@modules/plans/dtos/ICreatePlanDTO';

import AppError from '@shared/errors/AppError';
import Plan from '../entities/Plan';

class PlansRepository implements IPlansRepository {
  private ormRepository: Repository<Plan>;

  constructor() {
    this.ormRepository = getRepository(Plan);
  }

  public async find(page = 1, title?: string): Promise<Plan[]> {
    if (title) {
      const plans = await this.ormRepository.find({
        where: {
          title: Like(`%${title}%`),
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      return plans;
    }

    const plans = await this.ormRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });

    return plans;
  }

  public async findById(id: string): Promise<Plan | undefined> {
    const plan = await this.ormRepository.findOne(id);

    return plan;
  }

  public async findByTitle(title: string): Promise<Plan | undefined> {
    const plan = await this.ormRepository.findOne({ where: { title } });

    return plan;
  }

  public async create(planData: ICreatePlanDTO): Promise<Plan> {
    const plan = this.ormRepository.create(planData);

    await this.ormRepository.save(plan);

    return plan;
  }

  public async save(plan: Plan): Promise<Plan> {
    return this.ormRepository.save(plan);
  }

  public async delete(id: string): Promise<void | undefined> {
    const plan = await this.ormRepository.findOne(id);

    if (!plan) throw new AppError('Plan not found.');

    await this.ormRepository.delete(id);
  }
}

export default PlansRepository;
