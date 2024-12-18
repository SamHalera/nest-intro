import { Injectable, RequestTimeoutException } from '@nestjs/common';
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

    try {
      await this.tagRepository.save(tag);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error while saving tag into database',
        },
      );
    }
    return tag;
  }

  public async findMultipleTags(tags: number[]) {
    let results = undefined;
    try {
      results = await this.tagRepository.find({
        where: {
          id: In(tags),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error fetching tags to the database',
        },
      );
    }
    return results;
  }

  public async delete(id: number) {
    try {
      await this.tagRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error deleting tag to the database',
        },
      );
    }
    return { deleted: true, id };
  }
  public async softRemove(id: number) {
    try {
      await this.tagRepository.softDelete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error while soft delete process for tag',
        },
      );
    }
    return { deleted: true, id };
  }
}
