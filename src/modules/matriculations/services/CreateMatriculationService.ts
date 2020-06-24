import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMatriculationsRepository from '@modules/matriculations/repositories/IMatriculationsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Matriculation from '../infra/typeorm/entities/Matriculation';

interface IRequest {
  student_id: string;
  plan_id: string;
  start_date: Date;
}
@injectable()
class CreateMatriculationService {
  constructor(
    @inject('MatriculationsRepository')
    private matriculationsRepository: IMatriculationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    student_id,
    plan_id,
    start_date,
  }: IRequest): Promise<Matriculation> {
    const checkMatriculationexists = await this.matriculationsRepository.findByStudentId(
      student_id,
    );

    if (checkMatriculationexists) {
      throw new AppError('Student already matriculated.');
    }

    const matriculation = await this.matriculationsRepository.create({
      student_id,
      plan_id,
      start_date,
    });

    await this.cacheProvider.invalidatePrefix('matriculations-list');

    return matriculation;
  }
}

export default CreateMatriculationService;
