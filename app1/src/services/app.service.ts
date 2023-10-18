// app1/services/app1.service.ts
import { Injectable, Logger  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App1Entity } from '../entities/app.entity';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import * as amqp from 'amqplib';

@Injectable()
export class App1Service {
  private readonly logger = new Logger(App1Service.name);
  private client: ClientProxy;

  constructor(
    @InjectRepository(App1Entity)
    private readonly app1Repository: Repository<App1Entity>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'], // Replace with your RabbitMQ server URL
        queue: 'app1_created',
        queueOptions: {
          durable: true, // Ensure that the queue survives server restarts
        },
      },
    });

    // Declare the queue
    this.declareQueue().catch((err) => {
      this.logger.error(`Failed to declare the queue: ${err.message}`);
    });
  }

  // ... rest of your code ...

  private async declareQueue() {
    try {
      const connection = await amqp.connect('amqp://rabbitmq:5672'); // Use the service name
      const channel = await connection.createChannel();
      await channel.assertQueue('app1_created', {
        durable: true, // Ensure that the queue survives server restarts
      });
      await channel.close();
      await connection.close();
      this.logger.log('Queue declared successfully.');
    } catch (err) {
      this.logger.error(`Failed to declare the queue: ${err.message}`);
    }
  }


  async create(data: Partial<App1Entity>): Promise<App1Entity> {
    const entity = this.app1Repository.create(data);
    const createdEntity = await this.app1Repository.save(entity);

    // Publish a message to RabbitMQ
    this.client.emit('app1_created', createdEntity);
    // Declare the queue
    this.declareQueue().catch((err) => {
      this.logger.error(`Failed to declare the queue: ${err.message}`);
    });
    return createdEntity;
  }

  async findAll(): Promise<App1Entity[]> {
    return this.app1Repository.find();
  }

  async findById(id: number): Promise<App1Entity> {
    return this.app1Repository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<App1Entity>): Promise<App1Entity> {
    await this.app1Repository.update(id, data);
    // Declare the queue
    this.declareQueue().catch((err) => {
      this.logger.error(`Failed to declare the queue: ${err.message}`);
    });
    return this.app1Repository.findOne({ where: { id } }); // Retrieve the updated entity
  }

  async delete(id: number): Promise<void> {
    await this.app1Repository.delete(id);
  }

}
