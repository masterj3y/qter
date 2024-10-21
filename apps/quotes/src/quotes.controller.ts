import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNewQuote(
    @CurrentUser() currentUser: UserDto,
    @Body() createQuoteDto: CreateQuoteDto,
  ) {
    return this.quotesService.createQuote(currentUser._id, createQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findQuoteById(@Param('id') quoteId: string) {
    return this.quotesService.findQuoteById(quoteId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/list/all')
  findUserQuotes(@CurrentUser() currentUser: UserDto) {
    return this.quotesService.findUserQuotes(currentUser._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:id')
  findUserQuoteById(
    @CurrentUser() user: UserDto,
    @Param('id') quoteId: string,
  ) {
    return this.quotesService.findUserQuoteById(user._id, quoteId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/:id')
  updateUserQuote(
    @CurrentUser() user: UserDto,
    @Param('id') quoteId: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    return this.quotesService.updateUserQuote(
      user._id,
      quoteId,
      updateQuoteDto,
    );
  }
}
