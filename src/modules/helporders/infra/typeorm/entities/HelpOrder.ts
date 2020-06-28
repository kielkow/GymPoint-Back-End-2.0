import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Student from '@modules/students/infra/typeorm/entities/Student';

@Entity('helporders')
class HelpOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  student_id: string;

  @OneToOne(() => Student, student => student, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column('timestamp with time zone')
  answer_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default HelpOrder;
