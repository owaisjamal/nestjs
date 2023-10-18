import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('eventlogs') // The table name in your database
export class EventLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  // Add other columns as needed
}