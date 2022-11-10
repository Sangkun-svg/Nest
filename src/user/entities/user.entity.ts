import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  passwordHash: string;

  @Column()
  createAt: Date;
}
