import { ApiProperty } from '@nestjs/swagger';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface ReturnedUser {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class UserClass {
  @ApiProperty({
    description: 'The ID of the user',
    type: String,
    format: 'uuid',
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  id: string;

  @ApiProperty({
    description: 'The login of the user',
    type: String,
    example: 'testUser',
  })
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    description: "The version of the user's account",
    type: Number,
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Date of the account creation.',
    type: Number,
    example: 1655000000,
  })
  createAt: number;

  @ApiProperty({
    description: 'Date of the account modifying.',
    type: Number,
    example: 1655000000,
  })
  updateAt: number;
}

export class ReturnedUserClass {
  @ApiProperty({
    description: 'The ID of the user',
    type: String,
    format: 'uuid',
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  id: string;

  @ApiProperty({
    description: 'The login of the user',
    type: String,
    example: 'testUser',
  })
  login: string;

  @ApiProperty({
    description: "The version of the user's account",
    type: Number,
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Date of the account creation.',
    type: Number,
    example: 1655000000,
  })
  createAt: number;

  @ApiProperty({
    description: 'Date of the account modifying.',
    type: Number,
    example: 1655000000,
  })
  updateAt: number;
}
