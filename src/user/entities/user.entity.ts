import { Item } from 'src/item/entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 500, unique: true })
  name: string;

  @Column()
  passwordHash: string;

  @Column()
  createAt: Date;

  // @Column()
  // Item: Item[];
}
