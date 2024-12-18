import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaOptions.dto';

@Controller('meta-options')
@ApiTags('Meta Options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}
  @Post()
  @ApiProperty({
    description: 'Create a MetaOption',
  })
  public createMetaOptions(
    @Body() createMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    this.metaOptionsService.createMetaOptions(createMetaOptionsDto);
  }
}
