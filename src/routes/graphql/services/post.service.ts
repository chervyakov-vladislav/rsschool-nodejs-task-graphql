import { PrismaClient } from '@prisma/client';

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
