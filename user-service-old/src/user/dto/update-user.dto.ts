import { IsString } from 'class-validator';

export default class UpdateUserDTO {
  @IsString()
  readonly login?: string;
}
