import { Controller, Get } from '@nestjs/common';

@Controller('search/liveness')
export class LivenessController {
  @Get()
  livness() {
    return { live: 'yes' };
  }
}
