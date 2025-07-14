import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ModulesFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  field_name: string;

  @Column({ length: 500 })
  label: string;

  @Column({ length: 500 })
  module: string;

  @Column({ length: 50 })
  type: string; // e.g., 'Text', 'Date', 'Phone', 'Email', 'Number'

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}