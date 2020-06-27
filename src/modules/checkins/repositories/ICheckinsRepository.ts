import Checkin from '../infra/typeorm/entities/Checkin';
import ICreateCheckinDTO from '../dtos/ICreateCheckinDTO';

export default interface ICheckinsRepository {
  find(student_id: string): Promise<Checkin[]>;
  create(data: ICreateCheckinDTO): Promise<Checkin>;
  save(checkin: Checkin): Promise<Checkin>;
}
