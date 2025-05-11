import { Post, PrismaClient } from '@prisma/client';

export const posts = (prisma: PrismaClient) => async (userIds: readonly string[]) => {
  const posts = await prisma.post.findMany({
    where: { authorId: { in: userIds as string[] } },
  });

  const postMap = posts.reduce((obj: Record<string, Post[]>, post) => {
    obj[post.authorId] ? obj[post.authorId].push(post) : (obj[post.authorId] = [post]);

    return obj;
  }, {});

  const batchedPosts = userIds.map((id) => postMap[id]);

  return batchedPosts;
};
