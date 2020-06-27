import { startOfWeek, endOfWeek } from 'date-fns';
import { getRepository, Repository } from 'typeorm';

import ICheckinsRepository from '@modules/checkins/repositories/ICheckinsRepository';
import ICreateCheckinDTO from '@modules/checkins/dtos/ICreateCheckinDTO';

import Checkin from '../entities/Checkin';

class CheckinsRepository implements ICheckinsRepository {
  private ormRepository: Repository<Checkin>;

  constructor() {
    this.ormRepository = getRepository(Checkin);
  }

  public async find(student_id: string): Promise<Checkin[]> {
    const today = new Date();

    const checkins = await this.ormRepository
      .createQueryBuilder('checkin')
      .leftJoinAndSelect('checkin.student', 'student')
      .where('student.id = :id', { id: student_id })
      .andWhere('checkin.created_at >= :after', {
        after: startOfWeek(today, { weekStartsOn: 1 }),
      })
      .andWhere('checkin.created_at <= :before', { before: endOfWeek(today) })
      .getMany();

    return checkins;
  }

  public async create(checkinData: ICreateCheckinDTO): Promise<Checkin> {
    const checkin = this.ormRepository.create(checkinData);

    await this.ormRepository.save(checkin);

    return checkin;
  }

  public async save(checkin: Checkin): Promise<Checkin> {
    return this.ormRepository.save(checkin);
  }
}

export default CheckinsRepository;
