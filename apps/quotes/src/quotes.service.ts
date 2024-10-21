import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteDocument } from './model/quote.schema';
import { Model, Types } from 'mongoose';
import { CreateQuoteDto, IndexQuoteDto, SEARCH_SERVICE } from '@app/common';
import { UpdateQuoteDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(QuoteDocument.name)
    private readonly quoteModel: Model<QuoteDocument>,
    @Inject(SEARCH_SERVICE) private readonly searchClient: ClientProxy,
  ) {}

  async createQuote(userId: string, createQuoteDto: CreateQuoteDto) {
    let quote = await this.quoteModel.create({
      _id: new Types.ObjectId(),
      ...createQuoteDto,
      userId,
    });

    quote = await quote.save();
    const tempQuote = { ...quote.toObject(), _id: undefined };

    const indexQuoteDto: IndexQuoteDto = {
      ...tempQuote,
      documentDBId: quote._id.toString(),
    };

    this.searchClient.emit('index_quote', indexQuoteDto).subscribe();

    return quote;
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
