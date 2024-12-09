import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Too short' })
  @MaxLength(96, { message: 'Too long!' })
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Too short' })
  @MaxLength(96, { message: 'Too long!' })
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96, { message: 'Too long!' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Too short' })
  @MaxLength(96, { message: 'Too long!' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;
}
