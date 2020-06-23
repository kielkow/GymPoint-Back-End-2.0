import Matriculation from '../infra/typeorm/entities/Matriculation';
import ICreateMatriculationDTO from '../dtos/ICreateMatriculationDTO';

export default interface IMatriculationsRepository {
  find(page: number, student_name?: string): Promise<Matriculation[]>;
  findById(id: string): Promise<Matriculation | undefined>;
  findByStudentName(student_name: string): Promise<Matriculation | undefined>;
  create(data: ICreateMatriculationDTO): Promise<Matriculation>;
  save(matriculation: Matriculation): Promise<Matriculation>;
  delete(id: string): Promise<void | undefined>;
}
