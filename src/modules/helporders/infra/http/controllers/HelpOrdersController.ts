import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateHelpOrderService from '@modules/helporders/services/CreateHelpOrderService';
import CreateHelpOrderAnswerService from '@modules/helporders/services/CreateHelpOrderAnswerService';
import ListStudentHelpOrdersService from '@modules/helporders/services/ListStudentHelpOrdersService';
import ListNoAnswerHelpOrdersService from '@modules/helporders/services/ListNoAnswerHelpOrdersService';
import SendMailHelpOrderAnswerService from '@modules/helporders/services/SendMailHelpOrderAnswerService';

export default class HelpOrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;

    const listNoAnswerHelpOrdersService = container.resolve(
      ListNoAnswerHelpOrdersService,
    );

    const helporders = await listNoAnswerHelpOrdersService.execute(page);

    return response.json(classToClass(helporders));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const student_id = request.params.id;

    const listStudentHelpOrdersService = container.resolve(
      ListStudentHelpOrdersService,
    );

    const helporder = await listStudentHelpOrdersService.execute({
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

    const updateHelpOrder = container.resolve(CreateHelpOrderAnswerService);
    const sendMailHelpOrderAnswer = container.resolve(
      SendMailHelpOrderAnswerService,
    );

    const helporder = await updateHelpOrder.execute({
      helporder_id,
      answer,
    });

    await sendMailHelpOrderAnswer.execute({ helporder_id: helporder.id });

    return response.json(classToClass(helporder));
  }
}
