import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  label: string;

  @Column({ length: 50 })
  icon: string;
}