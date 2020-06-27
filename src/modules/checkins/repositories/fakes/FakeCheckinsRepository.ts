import { uuid } from 'uuidv4';

import ICheckinsRepository from '@modules/checkins/repositories/ICheckinsRepository';

import ICreateCheckinDTO from '@modules/checkins/dtos/ICreateCheckinDTO';

import Checkin from '../../infra/typeorm/entities/Checkin';

class FakeCheckinsRepository implements ICheckinsRepository {
  private checkins: Checkin[] = [];

  public async find(student_id: string): Promise<Checkin[]> {
    const findCheckins = this.checkins.filter(
      checkin => checkin.student.id === student_id,
    );

    return findCheckins;
  }

  public async create(checkinData: ICreateCheckinDTO): Promise<Checkin> {
    const checkin = new Checkin();

    Object.assign(checkin, { id: uuid() }, checkinData);

    this.checkins.push(checkin);

    return checkin;
  }

  public async save(checkin: Checkin): Promise<Checkin> {
    const findIndex = this.checkins.findIndex(
      findCheckin => findCheckin.id === checkin.id,
    );

    this.checkins[findIndex] = checkin;

    return checkin;
  }
}

export default FakeCheckinsRepository;
