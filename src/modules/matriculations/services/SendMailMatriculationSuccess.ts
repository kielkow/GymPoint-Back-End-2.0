import { injectable, inject } from 'tsyringe';
import path from 'path';
import format from 'date-fns/format';

import AppError from '@shared/errors/AppError';

import IMatriculationsRepository from '@modules/matriculations/repositories/IMatriculationsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import Matriculation from '../infra/typeorm/entities/Matriculation';

interface IRequest {
  matriculation_id: string;
}

@injectable()
class SendMailMatriculationSuccess {
  constructor(
    @inject('MatriculationsRepository')
    private matriculationsRepository: IMatriculationsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ matriculation_id }: IRequest): Promise<Matriculation> {
    const matriculation = await this.matriculationsRepository.findById(
      matriculation_id,
    );
    if (!matriculation) {
      throw new AppError(
        'Not possible send matriculation success mail. Matriculation not found',
      );
    }

    const matriculationSuccessTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'matriculation_success.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: matriculation.student.name,
        email: matriculation.student.email,
      },
      subject: '[GymPoint] Matriculation Success',
      templateData: {
        file: matriculationSuccessTemplate,
        variables: {
          name: matriculation.student.name,
          plan: matriculation.plan.title,
          start_date: format(matriculation.start_date, 'dd/MM/yyyy'),
        },
      },
    });

    return matriculation;
  }
}

export default SendMailMatriculationSuccess;
