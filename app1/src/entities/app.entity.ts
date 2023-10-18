// app1/entities/app1.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';
@Entity()
export class App1Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}