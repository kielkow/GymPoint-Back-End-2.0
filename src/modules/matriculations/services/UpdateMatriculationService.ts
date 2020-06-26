import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import IMatriculationsRepository from '../repositories/IMatriculationsRepository';

import Matriculation from '../infra/typeorm/entities/Matriculation';

interface IRequest {
  matriculation_id: string;
  plan_id: string;
  start_date: Date;
}

@injectable()
class UpdateMatriculationService {
  constructor(
    @inject('MatriculationsRepository')
    private matriculationsRepository: IMatriculationsRepository,

    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute({
    matriculation_id,
    plan_id,
    start_date,
  }: IRequest): Promise<Matriculation> {
    const matriculation = await this.matriculationsRepository.findById(
      matriculation_id,
    );

    if (!matriculation) {
      throw new AppError('Matriculation not found.');
    }

    const plan = await this.plansRepository.findById(plan_id);

    if (!plan) {
      throw new AppError('Plan not found.');
    }

    matriculation.plan = plan;
    matriculation.plan_id = plan.id;
    matriculation.start_date = start_date;

    return this.matriculationsRepository.save(matriculation);
  }
}

export default UpdateMatriculationService;
