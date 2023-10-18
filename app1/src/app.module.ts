import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { App1Controller } from './controllers/app.controller'; // Adjust the path as needed
import { App1Service } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App1Entity } from './entities/app.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'app1_db',
      entities: [App1Entity],
      synchronize: true, // Auto-generate and apply migrations (only for development)
    }),
    TypeOrmModule.forFeature([App1Entity]),
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
  controllers: [App1Controller],
  providers: [App1Service], // Ensure you have App1Service listed here
})
export class AppModule {}
