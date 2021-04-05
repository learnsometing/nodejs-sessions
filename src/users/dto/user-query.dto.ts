// Swagger
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents the query parameters that can be used to retrieve a User
 */
export default class UserQuery {
  @ApiProperty({ description: "User's email address", example: 'foo@bar.com' })
  readonly email: string;

  @ApiProperty({ description: "User's first name", example: 'Foo' })
  readonly firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Bar' })
  readonly lastName: string;
}
