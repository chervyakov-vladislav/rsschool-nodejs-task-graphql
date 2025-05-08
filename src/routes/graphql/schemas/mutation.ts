import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { CreatePostInput, PostResponse } from '../types/post.js';
import { PostDto, GraphQLContext } from '../types/common.js';
import { changePost, createPost, deletePost } from '../services/post.service.js';
import { UUIDType } from '../types/uuid.js';

export const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: PostResponse,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (_source, { dto }: { dto: PostDto }, { prisma }: GraphQLContext) =>
        createPost(dto, prisma),
    },

    changePost: {
      type: PostResponse,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (
        _source,
        { dto, id }: { dto: PostDto; id: string },
        { prisma }: GraphQLContext,
      ) => changePost(id, dto, prisma),
    },

    deletePost: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: { id: string }, { prisma }: GraphQLContext) =>
        deletePost(id, prisma),
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
