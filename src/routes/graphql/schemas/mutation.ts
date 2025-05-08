import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { CreatePostInput, PostResponse } from '../types/post.js';
import { CreatePostDto, GraphQLContext } from '../types/common.js';
import { createPost } from '../services/post.service.js';

export const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: PostResponse,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (
        _source,
        { dto }: { dto: CreatePostDto },
        { prisma }: GraphQLContext,
      ) => createPost(dto, prisma),
    },
    createUser: {
      type: GraphQLString,
      resolve: async () => {
        return 'Hello';
      },
    },
    createProfile: {
      type: GraphQLString,
      resolve: async () => {
        return 'Hello';
      },
    },
  },
});
