import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  prisma: PrismaClient;
}

export enum MemberType {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

export interface PostDto {
  title: string;
  content: string;
  authorId: string;
}

export interface UserDto {
  name: string;
  balance: number;
}

export interface ProfileDto {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}
