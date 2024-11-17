import { NestFactory } from '@nestjs/core';
import { QuotesModule } from './quotes.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(QuotesModule);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
