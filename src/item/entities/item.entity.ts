import { User } from 'src/user/entities/user.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Item {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany((type) => User, (user) => user) // ??
  user: User;

  @Column()
  userId: number;
}
