import { IsString, Matches } from 'class-validator';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX = /\S{8,}/gm;

export default class CreateUserDTO {
  @IsString()
  @Matches(EMAIL_REGEX)
  readonly email: string;

  @IsString()
  readonly login?: string;

  @IsString()
  @Matches(PASSWORD_REGEX)
  readonly password: string;
}
