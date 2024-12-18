import { Injectable } from '@nestjs/common';
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
    console.log('metaoptions creation!!');

    let newMetaOption = this.metaOptionsRepository.create(createMetaOptionsDto);

    return await this.metaOptionsRepository.save(newMetaOption);
  }
}
