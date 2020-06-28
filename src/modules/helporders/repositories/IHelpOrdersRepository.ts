import HelpOrder from '../infra/typeorm/entities/HelpOrder';
import ICreateHelpOrderDTO from '../dtos/ICreateHelpOrderDTO';

export default interface IHelpOrdersRepository {
  find(page: number): Promise<HelpOrder[]>;
  findById(id: string): Promise<HelpOrder | undefined>;
  findByStudentId(student_id: string): Promise<HelpOrder[] | undefined>;
  create(data: ICreateHelpOrderDTO): Promise<HelpOrder>;
  save(helporder: HelpOrder): Promise<HelpOrder>;
}
