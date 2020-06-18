import Plan from '../infra/typeorm/entities/Plan';
import ICreatePlanDTO from '../dtos/ICreatePlanDTO';

export default interface IPlansRepository {
  find(page: number): Promise<Plan[]>;
  findById(id: string): Promise<Plan | undefined>;
  findByTitle(title: string): Promise<Plan | undefined>;
  create(data: ICreatePlanDTO): Promise<Plan>;
  save(plan: Plan): Promise<Plan>;
  delete(id: string): Promise<void | undefined>;
}
