import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  author: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(1024)
  text: string;
}
