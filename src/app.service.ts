import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  helloWorld(message: any) {
    console.log('message', message);
    return 'Hello World!';
  }
}
