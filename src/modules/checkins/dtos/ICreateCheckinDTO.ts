import Student from '@modules/students/infra/typeorm/entities/Student';

export default interface ICreatePlanDTO {
  student: Student;
}
