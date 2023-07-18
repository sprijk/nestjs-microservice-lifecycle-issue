import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const show_the_bug = true; // ← change this to `false` to see the alternate approach work

  if (show_the_bug) {
    // current approach → onModuleInit() in `app.controller.ts` is never called
    const appConfig = await NestFactory.create(AppModule);
    const config = appConfig.get(ConfigService);

    const app = appConfig.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: config.get<number>('tcp.port'),
      },
    });

    await app.listen();
  } else {
    // This works:
    // alternate approach without `ConfigService` instance and hardcoding the tcp port → onModuleInit() in `app.controller.ts` is now indeed triggered
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        port: 3000,
      },
    });

    await app.listen();
  }
}

bootstrap();
