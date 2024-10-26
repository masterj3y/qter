import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AUTH_SERVICE, LoggerModule } from '@app/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LivenessModule } from './liveness/liveness.module';
import { ReadinessModule } from './readiness/readiness.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/search/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        ELASTIC_URI: Joi.string().required(),
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
    ]),
    ElasticsearchModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        node: configService.get<string>('ELASTIC_URI'),
      }),
      inject: [ConfigService],
    }),
    LivenessModule,
    ReadinessModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
