import Student from '@modules/students/infra/typeorm/entities/Student';
import Plan from '@modules/plans/infra/typeorm/entities/Plan';

export default interface ICreatePlanDTO {
  student: Student;
  plan: Plan;
  start_date: Date;
}
