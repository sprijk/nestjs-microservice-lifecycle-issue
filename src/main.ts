import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';

import { AppModule } from './app.module';

async function bootstrap() {
  const appConfig = await NestFactory.create(AppModule);
  const config = appConfig.get(ConfigService);

  const app = appConfig.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        // clientId: 'nautone-enrich',
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
}

bootstrap();
