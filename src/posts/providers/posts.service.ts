import { Injectable } from '@nestjs/common';
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
    //Find author from DB based on authorId (noramlly only authenticated user)

    const author = await this.usersService.findOneById(createPostDto.authorId);

    const tags = await this.tagService.findMultipleTags(createPostDto.tags);
    const existingPost = await this.postRepository.findOne({
      where: { slug: createPostDto.slug },
    });

    if (existingPost) {
      //handle error
    } else {
      let newPost = this.postRepository.create({
        ...createPostDto,
        tags,
        author,
      });

      return await this.postRepository.save(newPost);
    }
  }

  public async update(patchPostDto: PatchPostDto) {
    //Find the Tags
    const tags = await this.tagService.findMultipleTags(patchPostDto.tags);

    //Find the Post existing in DB
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });

    //Update properties of the Post
    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.slug = patchPostDto.slug ?? post.slug;
    post.schema = patchPostDto.schema ?? post.schema;

    //Assign the new tags to the Post
    post.tags = tags;
    //Save and return Post

    return await this.postRepository.save(post);
  }
  public async findAll() {
    //in order to populate the relations entities
    // we can use the object options into find :
    // {
    //   relations: {
    //     metaOptions: true,
    //   },
    // }
    //Or we can add eager:true option to @OneToOne decorator inside Entity
    const post = await this.postRepository.find({
      relations: {
        metaOptions: true,
        // tags: true,
        // author: true,
      },
    });

    return post;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
