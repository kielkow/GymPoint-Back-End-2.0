import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Student from '@modules/students/infra/typeorm/entities/Student';
import Plan from '@modules/plans/infra/typeorm/entities/Plan';

@Entity('matriculations')
class Matriculation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  student_id: string;

  @OneToOne(() => Student, student => student, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  @Exclude()
  plan_id: string;

  @ManyToOne(() => Plan, plan => plan, { eager: true })
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
