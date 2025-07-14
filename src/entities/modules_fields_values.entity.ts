import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ModulesFieldsValues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  field_name: string;

  @Column({ length: 500 })
  record_id: string;

  @Column({ length: 500 })
  value: string;

  @Column({ length: 500 })
  module: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}