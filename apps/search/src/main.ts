import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI')],
      queue: 'search',
    },
  });

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.startAllMicroservices();
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
