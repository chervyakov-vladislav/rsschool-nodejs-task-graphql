import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  prisma: PrismaClient;
}

export enum MemberType {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

export interface CreatePostDto {
  title: string;
  content: string;
  authorId: string;
}
