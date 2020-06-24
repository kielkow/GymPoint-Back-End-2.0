import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateMatriculationService from '@modules/matriculations/services/CreateMatriculationService';
// import UpdateMatriculationService from '@modules/matriculations/services/UpdateMatriculationService';
import ShowMatriculationService from '@modules/matriculations/services/ShowMatriculationService';
// import DeleteMatriculationService from '@modules/matriculations/services/DeleteMatriculationService';
// import ListMatriculationsService from '@modules/matriculations/services/ListMatriculationsService';

export default class MatriculationsController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const page = request.query.page ? Number(request.query.page) : 1;
  //   const title = request.query.title ? String(request.query.title) : undefined;

  //   const listMatriculationsService = container.resolve(
  //     ListMatriculationsService,
  //   );

  //   const matriculations = await listMatriculationsService.execute({
  //     page,
  //     title,
  //   });

  //   return response.json(classToClass(matriculations));
  // }

  public async show(request: Request, response: Response): Promise<Response> {
    const matriculation_id = request.params.id;

    const showMatriculationService = container.resolve(
      ShowMatriculationService,
    );

    const matriculation = await showMatriculationService.execute({
      matriculation_id,
    });

    return response.json(classToClass(matriculation));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { student_id, plan_id, start_date } = request.body;

    const createMatriculation = container.resolve(CreateMatriculationService);

    const matriculation = await createMatriculation.execute({
      student_id,
      plan_id,
      start_date,
    });

    return response.json(classToClass(matriculation));
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const matriculation_id = request.params.id;
  //   const { plan_id, start_date } = request.body;

  //   const updateMatriculation = container.resolve(UpdateMatriculationService);

  //   const matriculation = await updateMatriculation.execute({
  //     matriculation_id,
  //     plan_id,
  //     start_date,
  //   });

  //   return response.json(classToClass(matriculation));
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const matriculation_id = request.params.id;

  //   const deleteMatriculationService = container.resolve(
  //     DeleteMatriculationService,
  //   );

  //   await deleteMatriculationService.execute({ matriculation_id });

  //   return response.status(204).json({});
  // }
}
