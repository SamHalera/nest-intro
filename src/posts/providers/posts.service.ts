import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { MetaOption } from 'src/meta-options/meta-options.entity';

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
    public metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async createPost(@Body() createPostDto: CreatePostDto) {
    const existingPost = await this.postRepository.findOne({
      where: { slug: createPostDto.slug },
    });

    if (existingPost) {
      //handle error
    } else {
      let newPost = this.postRepository.create(createPostDto);

      return await this.postRepository.save(newPost);
    }
  }
  public async findAll(userId: string) {
    console.log('userId from arg==>', userId);

    const user = this.usersService.findOneById(userId);

    //in order to populate the relations entities
    // we can use the object options into find :
    // {
    //   relations: {
    //     metaOptions: true,
    //   },
    // }
    //Or we can add eager:true option to @OneToOne decorator inside Entity
    const post = await this.postRepository.find();

    return post;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
