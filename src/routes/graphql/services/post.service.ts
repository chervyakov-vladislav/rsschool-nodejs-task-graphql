import { PrismaClient } from '@prisma/client';
import { PostDto } from '../types/common.js';

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

export const createPost = async (dto: PostDto, prisma: PrismaClient) => {
  const newPost = await prisma.post.create({ data: dto, include: { author: true } });

  console.log(newPost);

  return newPost;
};

export const changePost = async (id: string, dto: PostDto, prisma: PrismaClient) => {
  const newPost = await prisma.post.update({
    data: dto,
    where: { id },
  });

  return newPost;
};

export const deletePost = async (id: string, prisma: PrismaClient) => {
  const deletedPostId = await prisma.post.delete({ where: { id }, select: { id: true } });

  return deletedPostId;
};
