import { getRepository, Repository, Like } from 'typeorm';

import IMatriculationsRepository from '@modules/matriculations/repositories/IMatriculationsRepository';
import ICreateMatriculationDTO from '@modules/matriculations/dtos/ICreateMatriculationDTO';

import AppError from '@shared/errors/AppError';
import Matriculation from '../entities/Matriculation';

class MatriculationsRepository implements IMatriculationsRepository {
  private ormRepository: Repository<Matriculation>;

  constructor() {
    this.ormRepository = getRepository(Matriculation);
  }

  public async find(page = 1, student_name?: string): Promise<Matriculation[]> {
    if (student_name) {
      const matriculations = await this.ormRepository.find({
        join: {
          alias: 'student',
          leftJoinAndSelect: {
            student: 'matriculation.student',
          },
        },
        where: {
          student: {
            name: Like(`%${student_name}%`),
          },
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      return matriculations;
    }

    const matriculations = await this.ormRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });

    return matriculations;
  }

  public async findById(id: string): Promise<Matriculation | undefined> {
    const matriculation = await this.ormRepository.findOne(id);

    return matriculation;
  }

  public async findByStudentName(
    student_name: string,
  ): Promise<Matriculation | undefined> {
    const matriculation = await this.ormRepository.findOne({
      join: {
        alias: 'student',
        leftJoinAndSelect: {
          student: 'matriculation.student',
        },
      },
      where: {
        student: {
          name: student_name,
        },
      },
    });

    return matriculation;
  }

  public async findByStudentId(
    student_id: string,
  ): Promise<Matriculation | undefined> {
    const matriculation = await this.ormRepository.findOne({
      where: {
        student_id,
      },
    });

    return matriculation;
  }

  public async create(
    matriculationData: ICreateMatriculationDTO,
  ): Promise<Matriculation> {
    const matriculation = this.ormRepository.create(matriculationData);

    await this.ormRepository.save(matriculation);

    return matriculation;
  }

  public async save(matriculation: Matriculation): Promise<Matriculation> {
    return this.ormRepository.save(matriculation);
  }

  public async delete(id: string): Promise<void | undefined> {
    const matriculation = await this.ormRepository.findOne(id);

    if (!matriculation) throw new AppError('Matriculation not found.');

    await this.ormRepository.delete(id);
  }
}

export default MatriculationsRepository;
