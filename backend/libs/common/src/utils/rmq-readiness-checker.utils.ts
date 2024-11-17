import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RMQReadinessChecker {
  private readonly rmqUri: string;

  constructor(configService: ConfigService) {
    this.rmqUri = configService.get<string>('RABBITMQ_URI');
  }

  async check() {
    try {
      const connection = await amqp.connect(this.rmqUri);
      await connection.close();
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
