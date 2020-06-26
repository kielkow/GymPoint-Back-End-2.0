import { injectable, inject } from 'tsyringe';

import IMatriculationsRepository from '../repositories/IMatriculationsRepository';

interface IRequest {
  matriculation_id: string;
}

@injectable()
class DeleteMatriculationService {
  constructor(
    @inject('MatriculationsRepository')
    private matriculationsRepository: IMatriculationsRepository,
  ) {}

  public async execute({
    matriculation_id,
  }: IRequest): Promise<void | undefined> {
    await this.matriculationsRepository.delete(matriculation_id);
  }
}

export default DeleteMatriculationService;
