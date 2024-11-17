import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ESReadinessChecker {
  private readonly esClient: Client;

  constructor(configService: ConfigService) {
    this.esClient = new Client({
      node: configService.get<string>('ELASTIC_URI'),
    });
  }

  async check() {
    try {
      await this.esClient.ping();
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  }
}
