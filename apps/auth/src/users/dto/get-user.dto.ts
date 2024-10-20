import { Expose } from 'class-transformer';

export class GetUserDto {
  @Expose()
  _id: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;
}
