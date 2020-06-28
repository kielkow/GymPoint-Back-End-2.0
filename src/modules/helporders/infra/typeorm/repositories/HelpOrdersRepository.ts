import { getRepository, Repository } from 'typeorm';

import IHelpOrdersRepository from '@modules/helporders/repositories/IHelpOrdersRepository';
import ICreateHelpOrderDTO from '@modules/helporders/dtos/ICreateHelpOrderDTO';

import HelpOrder from '../entities/HelpOrder';

class HelpOrdersRepository implements IHelpOrdersRepository {
  private ormRepository: Repository<HelpOrder>;

  constructor() {
    this.ormRepository = getRepository(HelpOrder);
  }

  public async find(page = 1): Promise<HelpOrder[]> {
    const helporders = await this.ormRepository.find({
      where: {
        answer: null,
      },
      skip: (page - 1) * 10,
      take: 10,
    });

    return helporders;
  }

  public async findById(id: string): Promise<HelpOrder | undefined> {
    const helporder = await this.ormRepository.findOne(id);

    return helporder;
  }

  public async findByStudentId(
    student_id: string,
  ): Promise<HelpOrder[] | undefined> {
    const helporders = await this.ormRepository.find({
      where: {
        student_id,
      },
    });

    return helporders;
  }

  public async create(helporderData: ICreateHelpOrderDTO): Promise<HelpOrder> {
    const helporder = this.ormRepository.create(helporderData);

    await this.ormRepository.save(helporder);

    return helporder;
  }

  public async save(helporder: HelpOrder): Promise<HelpOrder> {
    return this.ormRepository.save(helporder);
  }
}

export default HelpOrdersRepository;
