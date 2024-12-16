import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<object> {
    return { data: 'Hello World!' };
  }
}
