import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  first_name: string;

  @Column({ length: 500 })
  last_name: string;

  @Column('text', {nullable: true})
  description: string;

  @Column({ length: 500, default: ''  })
  email: string;

  @Column({ length: 50, default: ''  })
  password: string;

  @Column({ length: 50, default: ''  })
  status: string;

  @Column({ length: 50, default: '' })
  role: string;

  @Column('text', {nullable: true})
  phone: string;

  @Column('text', {nullable: true})
  address: string;

  @Column('text', {nullable: true})
  city: string;

  @Column('text', {nullable: true})
  state: string;

  @Column('text', {nullable: true})
  zip_code: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}