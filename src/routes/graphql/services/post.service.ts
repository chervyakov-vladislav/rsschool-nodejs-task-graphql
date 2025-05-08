import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from '../types/common.js';

export const getPosts = async (prisma: PrismaClient) => {
  const posts = await prisma.post.findMany();

  return posts;
};

export const getPost = async (id: string, prisma: PrismaClient) => {
  const post = await prisma.post.findUnique({ where: { id } });

  return post;
};

export const getPostsByAuthorId = async (id: string, prisma: PrismaClient) => {
  const posts = await prisma.post.findMany({ where: { authorId: id } });

  return posts;
};

export const createPost = async (dto: CreatePostDto, prisma: PrismaClient) => {
  const newPost = prisma.post.create({ data: dto });

  return newPost;
};
