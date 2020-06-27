import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Student from '@modules/students/infra/typeorm/entities/Student';

import { Exclude } from 'class-transformer';

@Entity('checkins')
class Checkin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  student_id: string;

  @OneToOne(() => Student, student => student, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Checkin;
