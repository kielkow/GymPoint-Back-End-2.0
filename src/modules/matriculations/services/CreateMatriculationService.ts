import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMatriculationsRepository from '@modules/matriculations/repositories/IMatriculationsRepository';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IPlansRepository from '@modules/plans/repositories/IPlansRepository';

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
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

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
    const student = await this.studentsRepository.findById(student_id);
    if (!student) throw new AppError('Student does not exists.');

    const plan = await this.plansRepository.findById(plan_id);
    if (!plan) throw new AppError('Plan does not exists.');

    const checkMatriculationexists = await this.matriculationsRepository.findByStudentId(
      student_id,
    );
    if (checkMatriculationexists) {
      throw new AppError('Student already matriculated.');
    }

    const matriculation = await this.matriculationsRepository.create({
      student,
      plan,
      start_date,
    });

    await this.cacheProvider.invalidatePrefix('matriculations-list');

    return matriculation;
  }
}

export default CreateMatriculationService;
