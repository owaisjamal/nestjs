import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class MessageConsumerService {
  private readonly logger = new Logger(MessageConsumerService.name);

  constructor(
  ) {
    this.setupRabbitMQConnection();
  }

  async setupRabbitMQConnection() {
    const conn = await amqp.connect('amqp://rabbitmq:5672'); // Use the service name of RabbitMQ in your Docker Compose
    const channel = await conn.createChannel();
    this.logger.log(`Connected to RabbitMQ server at rabbitmq:5672`);

    const queue = 'app1_created';
    channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        this.logger.log(`Received message: ${messageContent}`);
        
        // Process the message as needed and save it to the database
        // this.saveToDatabase(messageContent);
        
        channel.ack(msg);
      }
    });
  }

  // async saveToDatabase(messageContent: string) {
  //   // Create an EventLogEntity and set its properties
  //   const eventLog = new EventLogEntity();
  //   eventLog.message = messageContent;
  //   // You can set other properties here based on your entity structure.

  //   // Save the EventLogEntity to the database using your service
  //   const savedEventLog = await this.eventLogService.create(eventLog);
  //   this.logger.log(`Saved message to database: ${messageContent}`);
  // }
}
