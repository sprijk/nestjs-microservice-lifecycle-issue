import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    // this is never called!
    console.log('hello?');
  }

  @MessagePattern('hello')
  getHello(@Payload() message: any) {
    return this.appService.helloWorld(message);
  }
}
