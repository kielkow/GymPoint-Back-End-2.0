import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMatriculationsRepository from '../repositories/IMatriculationsRepository';
import Matriculation from '../infra/typeorm/entities/Matriculation';

interface IRequest {
  matriculation_id: string;
}

@injectable()
class ShowMatriculationService {
  constructor(
    @inject('MatriculationsRepository')
    private matriculationsRepository: IMatriculationsRepository,
  ) {}

  public async execute({ matriculation_id }: IRequest): Promise<Matriculation> {
    const matriculation = await this.matriculationsRepository.findById(
      matriculation_id,
    );

    if (!matriculation) {
      throw new AppError('Matriculation not found.');
    }

    delete matriculation.student_id;
    delete matriculation.plan_id;

    return matriculation;
  }
}

export default ShowMatriculationService;
