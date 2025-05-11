import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { posts } from './batchFunctions/posts.js';
import { profiles } from './batchFunctions/profile.js';
import { member } from './batchFunctions/member.js';
import { users } from './batchFunctions/users.js';

export const createLoaders = (prisma: PrismaClient) => ({
  profileLoader: new DataLoader(profiles(prisma)),
  postsLoader: new DataLoader(posts(prisma)),
  memberLoader: new DataLoader(member(prisma)),
  usersLoader: new DataLoader(users(prisma)),
});
