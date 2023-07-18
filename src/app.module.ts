import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import tcp from './config/tcp';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [tcp],
});

@Module({
  imports: [configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
