import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLogEntity } from '../entities/eventlog.entity';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLogEntity) // Inject the repository for the EventLogEntity
    private readonly eventLogRepository: Repository<EventLogEntity>,
  ) {}

  async create(eventLog: EventLogEntity): Promise<EventLogEntity> {
    return this.eventLogRepository.save(eventLog);
  }

  async findAll(): Promise<EventLogEntity[]> {
    return this.eventLogRepository.find();
  }

}