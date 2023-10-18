import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageConsumerService } from './message-consumer/message-consumer.service'; // Import your message consumer service here

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

@Module({
  imports: [
     ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // Change this URL to match your RabbitMQ server.
          queue: 'app1_queue',
        },
      },
    ]),
  ],
 controllers: [/* Include your controllers here if needed */],
  providers: [
    MessageConsumerService, // Include your message consumer service here
  ],
  exports: [
  ],
})
export class AppModule {}
