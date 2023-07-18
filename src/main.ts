import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';

import { AppModule } from './app.module';

async function bootstrap() {
  // current approach → onModuleInit() in `app.controller.ts` is never called
  const appConfig = await NestFactory.create(AppModule);
  const config = appConfig.get(ConfigService);

  const app = appConfig.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: config.get<string[]>('kafka.brokers'),
      },
      consumer: {
        groupId: 'some-consumer-group-id',
      },
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.DefaultPartitioner,
      },
    },
  });

  await app.listen();

  // // This works:
  // // alternate approach without `ConfigService` instance and hardcoding the kafka brokers → onModuleInit() in `app.controller.ts` is triggered
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:9092']
  //     },
  //     consumer: {
  //       groupId: 'some-consumer-group-id',
  //     },
  //     producer: {
  //       allowAutoTopicCreation: true,
  //       createPartitioner: Partitioners.DefaultPartitioner,
  //     },
  //   },
  // });

  // await app.listen();
}

bootstrap();
