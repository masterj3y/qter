import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  SEARCH_SERVICE,
} from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuotesController } from './quotes.controller';
import { QuoteDocument, QuoteSchema } from './model/quote.schema';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/quotes/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: SEARCH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'search',
          },
        }),
        inject: [ConfigService],
      },
    ]),
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: QuoteDocument.name,
        schema: QuoteSchema,
      },
    ]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
