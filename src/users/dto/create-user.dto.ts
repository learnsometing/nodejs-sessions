// Swagger
import { ApiProperty } from '@nestjs/swagger';
export default class CreateUserDTO {
  @ApiProperty({ description: "User's email address", example: 'foo@bar.com' })
  readonly email: string;

  @ApiProperty({ description: "User's first name", example: 'Foo' })
  readonly firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Bar' })
  readonly lastName: string;

  @ApiProperty({ description: "User's password", example: 'password' })
  readonly password: string;
}
