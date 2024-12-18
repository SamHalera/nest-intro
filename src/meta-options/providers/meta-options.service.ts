import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-metaOptions.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async createMetaOptions(
    createMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    const newMetaOption =
      this.metaOptionsRepository.create(createMetaOptionsDto);
    try {
      await this.metaOptionsRepository.save(newMetaOption);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error saving meta options to the database',
        },
      );
    }
    return newMetaOption;
  }
}
