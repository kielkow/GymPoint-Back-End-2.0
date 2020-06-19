import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import UpdateProfileService from '@modules/students/services/UpdateStudentService';
import ShowProfileService from '@modules/students/services/ShowStudentService';
import ListStudentsService from '@modules/students/services/ListStudentsService';

export default class StudentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;

    const name = request.query.name ? String(request.query.name) : undefined;

    const listStudentsService = container.resolve(ListStudentsService);

    const students = await listStudentsService.execute({ page, name });

    return response.json(classToClass(students));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const student_id = request.params.id;

    const showProfileService = container.resolve(ShowProfileService);

    const student = await showProfileService.execute({ student_id });

    return response.json(classToClass(student));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, age, weight, height } = request.body;

    const createStudent = container.resolve(CreateStudentService);

    const student = await createStudent.execute({
      name,
      email,
      age,
      weight,
      height,
    });

    return response.json(classToClass(student));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const student_id = request.params.id;
    const { name, email, age, weight, height } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const student = await updateProfile.execute({
      student_id,
      name,
      email,
      age,
      weight,
      height,
    });

    return response.json(classToClass(student));
  }
}
