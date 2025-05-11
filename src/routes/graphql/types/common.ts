import { Post, PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

interface Loaders {
  profileLoader: DataLoader<string, Profile>;
  postsLoader: DataLoader<string, Post[]>;
  memberTypeLoader: DataLoader<string, MemberType>;
  usersLoader: DataLoader<string, User>;
}
export interface GraphQLContext extends Loaders {
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

export interface Subscribe {
  subscriberId: string;
  authorId: string;
}

export interface User extends UserDto {
  id: string;
}
