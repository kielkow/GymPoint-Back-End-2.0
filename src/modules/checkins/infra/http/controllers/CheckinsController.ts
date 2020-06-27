import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateCheckinService from '@modules/checkins/services/CreateCheckinService';
import ListCheckinsService from '@modules/checkins/services/ListCheckinsService';

export default class CheckinsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const student_id = String(request.params.id);

    const listCheckinsService = container.resolve(ListCheckinsService);

    const checkins = await listCheckinsService.execute({ student_id });

    return response.json(classToClass(checkins));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const student_id = String(request.params.id);

    const createCheckin = container.resolve(CreateCheckinService);

    const checkin = await createCheckin.execute({ student_id });

    return response.json(classToClass(checkin));
  }
}
