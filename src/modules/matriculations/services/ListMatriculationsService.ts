import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMatriculationsRepository from '../repositories/IMatriculationsRepository';

import Matriculation from '../infra/typeorm/entities/Matriculation';

interface IRequest {
  page: number;
  student_name?: string;
}

@injectable()
class ListMatriculationsService {
  constructor(
    @inject('MatriculationsRepository')
    private matriculationsRepository: IMatriculationsRepository,
  ) {}

  public async execute({
    page = 1,
    student_name,
  }: IRequest): Promise<Matriculation[]> {
    const matriculations = await this.matriculationsRepository.find(
      page,
      student_name,
    );

    if (!matriculations) {
      throw new AppError('Matriculations not found.');
    }

    return matriculations;
  }
}

export default ListMatriculationsService;
