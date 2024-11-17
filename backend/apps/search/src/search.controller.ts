import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { EventPattern } from '@nestjs/microservices';
import { JwtAuthGuard } from '@app/common';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @EventPattern('index_quote')
  indexQuote(data: any) {
    console.log(data);
    return this.searchService.indexQuote(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  search(@Query('q') query: string) {
    return this.searchService.search(query);
  }
}
