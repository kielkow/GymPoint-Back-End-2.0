import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page = 1,
    student_name,
  }: IRequest): Promise<Matriculation[]> {
    const cacheKey = 'matriculations-list';

    let matriculations = await this.cacheProvider.recover<Matriculation[]>(
      cacheKey,
    );

    if (!matriculations) {
      matriculations = await this.matriculationsRepository.find(
        page,
        student_name,
      );

      if (!matriculations) {
        throw new AppError('Matriculations not found.');
      }
    }

    return matriculations;
  }
}

export default ListMatriculationsService;
