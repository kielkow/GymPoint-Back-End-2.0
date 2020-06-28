import Student from '@modules/students/infra/typeorm/entities/Student';

export default interface ICreateHelpOrderDTO {
  student: Student;
  question: string;
}
