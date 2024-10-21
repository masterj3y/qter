import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteDocument } from './model/quote.schema';
import { Model, Types } from 'mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(QuoteDocument.name)
    private readonly quoteModel: Model<QuoteDocument>,
  ) {}

  async createQuote(userId: string, createQuoteDto: CreateQuoteDto) {
    const quote = await this.quoteModel.create({
      _id: new Types.ObjectId(),
      ...createQuoteDto,
      userId,
    });
    return quote.save();
  }

  findQuoteById(quoteId: string) {
    return this.quoteModel.findById(quoteId);
  }

  findUserQuotes(userId: string) {
    return this.quoteModel.find({ userId });
  }

  async findUserQuoteById(userId: string, quoteId: string) {
    const quote = await this.quoteModel.findOne({ _id: quoteId, userId });
    if (!quote) {
      throw new NotFoundException(`no quote found with id ${quoteId}`);
    }

    return quote;
  }

  async updateUserQuote(
    userId: string,
    quoteId: string,
    updateQuoteDto: UpdateQuoteDto,
  ) {
    const quote = await this.quoteModel.findOne({ _id: quoteId, userId });
    if (!quote) {
      throw new NotFoundException(`no quote found of yours with id ${quoteId}`);
    }

    Object.assign(quote, updateQuoteDto);

    return await quote.save();
  }
}
