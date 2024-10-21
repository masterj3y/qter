import { IndexQuoteDto } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async indexQuote(indexQuoteDto: IndexQuoteDto) {
    return await this.esService.index({
      index: 'quotes',
      document: indexQuoteDto,
    });
  }

  async search(query: string) {
    if (!query) {
      throw new BadRequestException(
        'specify the query using `q` query parameter',
      );
    }

    const result = await this.esService.search({
      index: 'quotes',
      query: {
        multi_match: {
          query,
          type: 'cross_fields',
          fields: ['*'],
          operator: 'or',
        },
      },
    });

    return result.hits.hits.map((el) => el._source);
  }
}
