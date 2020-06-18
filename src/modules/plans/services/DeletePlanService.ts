import { injectable, inject } from 'tsyringe';

import IPlansRepository from '../repositories/IPlansRepository';

interface IRequest {
  plan_id: string;
}

@injectable()
class DeletePlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute({ plan_id }: IRequest): Promise<void | undefined> {
    await this.plansRepository.delete(plan_id);
  }
}

export default DeletePlanService;
