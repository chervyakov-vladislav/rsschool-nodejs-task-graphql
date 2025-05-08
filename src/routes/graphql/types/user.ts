import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileResponse } from './profile.js';
import { GraphQLContext } from './common.js';
import { getProfileByUserId } from '../services/profile.service.js';
import { PostResponse } from './post.js';
import { getPostsByAuthorId } from '../services/post.service.js';
import { getSubscribedToUser, getUserSubscribedTo } from '../services/user.service.js';

export const UserResponse: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserResponse',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileResponse,
      resolve: async ({ id }: { id: string }, _args, { prisma }: GraphQLContext) =>
        getProfileByUserId(id, prisma),
    },

    posts: {
      type: new GraphQLList(PostResponse),
      resolve: async ({ id }: { id: string }, _args, { prisma }: GraphQLContext) =>
        getPostsByAuthorId(id, prisma),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserResponse),
      resolve: async ({ id }: { id: string }, _args, { prisma }: GraphQLContext) =>
        getUserSubscribedTo(id, prisma),
    },

    subscribedToUser: {
      type: new GraphQLList(UserResponse),
      resolve: async ({ id }: { id: string }, _args, { prisma }: GraphQLContext) =>
        getSubscribedToUser(id, prisma),
    },
  }),
});
