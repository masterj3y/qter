import { CreateQuoteDto } from './create-quote.dto';

export class IndexQuoteDto extends CreateQuoteDto {
  documentDBId: string;
}
