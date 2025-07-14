import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ModulesFieldsValuesDefinition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  field_name: string;

  @Column({ length: 500 })
  module: string;
  
  @Column({ length: 500 })
  type: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}