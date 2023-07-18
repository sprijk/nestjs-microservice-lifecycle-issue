import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import kafka from './config/kafka';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [kafka],
});

@Module({
  imports: [configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
