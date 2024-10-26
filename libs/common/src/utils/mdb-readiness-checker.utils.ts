import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MDBReadinessChecker {
  private readonly mdbUri: string;

  constructor(configService: ConfigService) {
    this.mdbUri = configService.get<string>('MONGODB_URI');
  }

  async check() {
    try {
      await mongoose.connect(this.mdbUri);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
