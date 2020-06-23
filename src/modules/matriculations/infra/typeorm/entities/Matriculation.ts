import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Student from '@modules/students/infra/typeorm/entities/Student';
import Plan from '@modules/plans/infra/typeorm/entities/Plan';

@Entity('matriculations')
class Matriculation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  plan_id: string;

  @OneToOne(() => Plan)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column('timestamp with time zone')
  start_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Matriculation;
