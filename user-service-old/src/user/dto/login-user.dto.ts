import { IsString } from 'class-validator';

export default class LoginUserDTO {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
