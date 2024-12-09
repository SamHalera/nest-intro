import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from './create-post-metaOptions.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is the title for the post',
    example: 'This is the title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title is too short' })
  @MaxLength(512, { message: 'Title is too Long' })
  title: string;

  @ApiProperty({
    enum: PostType,
    description: "Possible values :  'post', 'page', 'strory', 'series'",
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: "For exemple : 'my-url'",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Slug is too short' })
  @MaxLength(256, { message: 'Slug is too Long' })
  @Matches(/^[a-z0-9]+(?:-[a-z09]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: PostStatus,
    description:
      "Possible values :  'draft', 'scheduled', 'review', 'published'",
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'This is the content of post',
    example: 'This is the content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example:
      '{\r\n    "@context": "https:\/\/schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'http://localhost.com/images.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Date o witch the blog post ois published',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags as string values',
    example: ['nestJS', 'typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true, message: 'Too short' })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value taht you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}

// {
//     "title": "What's new with NestJS",
//     "postType": "post",
//     "slug": "new-with-nest-js",
//     "status": "draft",
//     "content": "post-content",
//     "schema": "{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }",
//     "featuredImageUrl": "http://localhost.com/images/image1.jpg",
//     "publishOn": "2024-03-16T07:46:32+0000",
//     "tags": [
//       "nestJS",
//       "typescript"
//     ],
//     "metaOptions": [
//       {
//         "key": "testKey",
//         "value": 20
//       }
//     ]
//   }
