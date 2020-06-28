import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateHelpOrderService from '@modules/helporders/services/CreateHelpOrderService';
import UpdateHelpOrderService from '@modules/helporders/services/UpdateHelpOrderService';
import ShowHelpOrderService from '@modules/helporders/services/ShowHelpOrderService';
import ListHelpOrdersService from '@modules/helporders/services/ListHelpOrdersService';

export default class HelpOrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;

    const listHelpOrdersService = container.resolve(ListHelpOrdersService);

    const helporders = await listHelpOrdersService.execute({
      page,
    });

    return response.json(classToClass(helporders));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const student_id = request.params.id;

    const showHelpOrderService = container.resolve(ShowHelpOrderService);

    const helporder = await showHelpOrderService.execute({
      page,
      student_id,
    });

    return response.json(classToClass(helporder));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const question = String(request.body.question);
    const student_id = request.params.id;

    const createHelpOrder = container.resolve(CreateHelpOrderService);

    const helporder = await createHelpOrder.execute({
      student_id,
      question,
    });

    return response.json(classToClass(helporder));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const helporder_id = request.params.id;
    const answer = String(request.body.answer);

    const updateHelpOrder = container.resolve(UpdateHelpOrderService);

    const helporder = await updateHelpOrder.execute({
      helporder_id,
      answer,
    });

    return response.json(classToClass(helporder));
  }
}
