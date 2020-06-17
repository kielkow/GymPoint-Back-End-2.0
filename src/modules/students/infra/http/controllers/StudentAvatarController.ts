import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import UpdateStudentAvatarService from '@modules/students/services/UpdateStudentAvatarService';

export default class StudentAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateStudentAvatar = container.resolve(UpdateStudentAvatarService);

    const student = await updateStudentAvatar.execute({
      student_id: request.params.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(student));
  }
}
