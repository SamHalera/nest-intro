import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { MetaOption } from 'src/meta-options/meta-options.entity';

import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    /**
     * Injection of PostRepository
     */
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    /**
     * Injection of MetaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,

    /**
     * Injection Tags Service
     */
    private readonly tagService: TagsService,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    let author = undefined;
    let tags = undefined;
    let existingPost = undefined;

    try {
      author = await this.usersService.findOneById(createPostDto.authorId);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error fetching author from the database',
        },
      );
    }

    if (!author) {
      throw new BadRequestException('The author ID does not exists');
    }

    try {
      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error fetching tags from the database',
        },
      );
    }
    if (!tags || tags.length !== createPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tags Ids and ensure they are correct',
      );
    }

    try {
      existingPost = await this.postRepository.findOne({
        where: { slug: createPostDto.slug },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error fetching post from the database',
        },
      );
    }

    if (existingPost) {
      throw new BadRequestException('The post already exists');
    }

    const newPost = this.postRepository.create({
      ...createPostDto,
      tags,
      author,
    });

    try {
      await this.postRepository.save(newPost);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error saving post to the database',
        },
      );
    }
    return newPost;
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    try {
      tags = await this.tagService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tags Ids and ensure they are correct',
      );
    }

    try {
      post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error fetching post from the database',
        },
      );
    }

    if (!post) {
      throw new BadRequestException('The post ID does not exists');
    }

    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.slug = patchPostDto.slug ?? post.slug;
    post.schema = patchPostDto.schema ?? post.schema;
    post.tags = tags;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error saving post to the database',
        },
      );
    }

    return post;
  }
  public async findAll() {
    let posts = undefined;
    try {
      //in order to populate the relations entities
      // we can use the object options into find :
      // {
      //   relations: {
      //     metaOptions: true,
      //   },
      // }
      //Or we can add eager:true option to @OneToOne decorator inside Entity

      posts = await this.postRepository.find({
        relations: {
          metaOptions: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error fetching all posts from the database',
        },
      );
    }

    return posts;
  }

  public async delete(id: number) {
    try {
      await this.postRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error deleting post from the database',
        },
      );
    }
    return { deleted: true, id };
  }
}
