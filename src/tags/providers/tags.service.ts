import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from '../tags.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject TagReposiroty
     */
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);

    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    const results = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
    return results;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return { deleted: true, id };
  }
  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return { deleted: true, id };
  }
}
