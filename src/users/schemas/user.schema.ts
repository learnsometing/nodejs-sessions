import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ description: "User's email address", example: 'foo@bar.com' })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ description: "User's first name", example: 'Foo' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Bar' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ description: "User's password", example: 'password' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
