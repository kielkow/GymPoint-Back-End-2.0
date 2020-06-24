import { uuid } from 'uuidv4';

import IMatriculationsRepository from '@modules/matriculations/repositories/IMatriculationsRepository';
import ICreateMatriculationDTO from '@modules/matriculations/dtos/ICreateMatriculationDTO';

import AppError from '@shared/errors/AppError';

import Student from '@modules/students/infra/typeorm/entities/Student';
import Matriculation from '../../infra/typeorm/entities/Matriculation';

class FakeMatriculationsRepository implements IMatriculationsRepository {
  private students: Student[] = [];

  private matriculations: Matriculation[] = [];

  public async find(page = 1, student_name?: string): Promise<Matriculation[]> {
    if (student_name) {
      const findStudents = this.students.filter(student =>
        student.name.includes(student_name),
      );

      const studentsId = findStudents.map(findStudent => findStudent.id);

      const findMatriculations = this.matriculations.filter(matriculation =>
        studentsId.includes(matriculation.student_id),
      );

      return findMatriculations;
    }

    const skip = (page - 1) * 10;
    const take = skip + 10;

    const findMatriculations = this.matriculations.slice(skip, take);

    return findMatriculations;
  }

  public async findById(id: string): Promise<Matriculation | undefined> {
    const findMatriculation = this.matriculations.find(
      matriculation => matriculation.id === id,
    );

    return findMatriculation;
  }

  public async findByStudentName(
    student_name: string,
  ): Promise<Matriculation | undefined> {
    const findStudent = this.students.find(
      student => student.name === student_name,
    );

    if (!findStudent) {
      throw new AppError('Student not found.');
    }

    const findMatriculation = this.matriculations.find(
      matriculation => matriculation.student_id === findStudent.id,
    );

    return findMatriculation;
  }

  public async findByStudentId(
    student_id: string,
  ): Promise<Matriculation | undefined> {
    const findMatriculation = this.matriculations.find(
      matriculation => matriculation.student_id === student_id,
    );

    return findMatriculation;
  }

  public async create(
    matriculationData: ICreateMatriculationDTO,
  ): Promise<Matriculation> {
    const matriculation = new Matriculation();

    Object.assign(matriculation, { id: uuid() }, matriculationData);

    this.matriculations.push(matriculation);

    return matriculation;
  }

  public async save(matriculation: Matriculation): Promise<Matriculation> {
    const findIndex = this.matriculations.findIndex(
      findMatriculation => findMatriculation.id === matriculation.id,
    );

    this.matriculations[findIndex] = matriculation;

    return matriculation;
  }

  public async delete(id: string): Promise<void | undefined> {
    const findMatriculation = this.matriculations.find(
      matriculation => matriculation.id === id,
    );

    if (!findMatriculation) throw new AppError('Matriculation not found');

    const matriculationsNotDeleted = this.matriculations.filter(
      matriculation => matriculation.id !== id,
    );

    this.matriculations = matriculationsNotDeleted;
  }
}

export default FakeMatriculationsRepository;