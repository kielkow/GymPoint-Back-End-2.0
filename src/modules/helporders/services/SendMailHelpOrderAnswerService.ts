import { injectable, inject } from 'tsyringe';
import path from 'path';
import format from 'date-fns/format';

import AppError from '@shared/errors/AppError';

import IHelpOrdersRepository from '@modules/helporders/repositories/IHelpOrdersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import HelpOrder from '../infra/typeorm/entities/HelpOrder';

interface IRequest {
  helporder_id: string;
}

@injectable()
class SendMailHelpOrderAnswerService {
  constructor(
    @inject('HelpOrdersRepository')
    private helpordersRepository: IHelpOrdersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ helporder_id }: IRequest): Promise<HelpOrder> {
    const helporder = await this.helpordersRepository.findById(helporder_id);
    if (!helporder) {
      throw new AppError(
        'Not possible send helporder answer mail. HelpOrder not found',
      );
    }

    const helporderSuccessTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'helporder_answer.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: helporder.student.name,
        email: helporder.student.email,
      },
      subject: '[GymPoint] HelpOrder Answer',
      templateData: {
        file: helporderSuccessTemplate,
        variables: {
          name: helporder.student.name,
          question: helporder.question,
          answer: helporder.answer,
          answer_at: format(helporder.answer_at, 'dd/MM/yyyy'),
        },
      },
    });

    return helporder;
  }
}

export default SendMailHelpOrderAnswerService;
