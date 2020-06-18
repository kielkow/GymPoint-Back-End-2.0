import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreatePlanService from '@modules/plans/services/CreatePlanService';
import UpdateProfileService from '@modules/plans/services/UpdatePlanService';
import ShowPlanService from '@modules/plans/services/ShowPlanService';
import DeletePlanService from '@modules/plans/services/DeletePlanService';
import ListPlansService from '@modules/plans/services/ListPlansService';

export default class PlansController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);

    const listPlansService = container.resolve(ListPlansService);

    const plans = await listPlansService.execute({ page });

    return response.json(classToClass(plans));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const plan_id = request.params.id;

    const showProfileService = container.resolve(ShowPlanService);

    const plan = await showProfileService.execute({ plan_id });

    return response.json(classToClass(plan));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, duration, price } = request.body;

    const createPlan = container.resolve(CreatePlanService);

    const plan = await createPlan.execute({
      title,
      duration,
      price,
    });

    return response.json(classToClass(plan));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const plan_id = request.params.id;
    const { title, duration, price } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const plan = await updateProfile.execute({
      plan_id,
      title,
      duration,
      price,
    });

    return response.json(classToClass(plan));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const plan_id = request.params.id;

    const deletePlanService = container.resolve(DeletePlanService);

    await deletePlanService.execute({ plan_id });

    return response.status(204).json({});
  }
}
