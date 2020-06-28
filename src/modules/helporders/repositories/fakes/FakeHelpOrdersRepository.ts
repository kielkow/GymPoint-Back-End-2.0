import { uuid } from 'uuidv4';

import IHelpOrdersRepository from '@modules/helporders/repositories/IHelpOrdersRepository';

import ICreateHelpOrderDTO from '@modules/helporders/dtos/ICreateHelpOrderDTO';

import HelpOrder from '../../infra/typeorm/entities/HelpOrder';

class FakeHelpOrdersRepository implements IHelpOrdersRepository {
  private helporders: HelpOrder[] = [];

  public async find(page = 1): Promise<HelpOrder[]> {
    const skip = (page - 1) * 10;
    const take = skip + 10;

    const findHelpOrders = this.helporders.slice(skip, take);

    return findHelpOrders;
  }

  public async findById(id: string): Promise<HelpOrder | undefined> {
    const findHelpOrder = this.helporders.find(
      helporder => helporder.id === id,
    );

    return findHelpOrder;
  }

  public async findByStudentId(
    student_id: string,
  ): Promise<HelpOrder[] | undefined> {
    const findHelpOrders = this.helporders.filter(
      helporder => helporder.student.id === student_id,
    );

    return findHelpOrders;
  }

  public async create(helporderData: ICreateHelpOrderDTO): Promise<HelpOrder> {
    const helporder = new HelpOrder();

    Object.assign(helporder, { id: uuid() }, helporderData);

    this.helporders.push(helporder);

    return helporder;
  }

  public async save(helporder: HelpOrder): Promise<HelpOrder> {
    const findIndex = this.helporders.findIndex(
      findHelpOrder => findHelpOrder.id === helporder.id,
    );

    this.helporders[findIndex] = helporder;

    return helporder;
  }
}

export default FakeHelpOrdersRepository;
