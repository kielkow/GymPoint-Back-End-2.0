import Student from '../infra/typeorm/entities/Student';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';

export default interface IStudentsRepository {
  findAllByName(name: string): Promise<Student[]>;

  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;

  create(data: ICreateStudentDTO): Promise<Student>;
  save(student: Student): Promise<Student>;
}
