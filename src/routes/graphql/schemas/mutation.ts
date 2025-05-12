import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ChangePostInput, CreatePostInput, PostResponse } from '../types/post.js';
import { PostDto, GraphQLContext, UserDto, ProfileDto } from '../types/common.js';
import { changePost, createPost, deletePost } from '../services/post.service.js';
import { UUIDType } from '../types/uuid.js';
import { ChangeUserInput, CreateUserInput, UserResponse } from '../types/user.js';
import {
  changeUser,
  createUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
} from '../services/user.service.js';
import {
  ChangeProfileInput,
  CreateProfileInput,
  ProfileResponse,
} from '../types/profile.js';
import {
  changeProfile,
  createProfile,
  deleteProfile,
} from '../services/profile.service.js';

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
        dto: { type: new GraphQLNonNull(ChangePostInput) },
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
      type: UserResponse,
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: async (_source, { dto }: { dto: UserDto }, { prisma }: GraphQLContext) =>
        createUser(dto, prisma),
    },

    changeUser: {
      type: UserResponse,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        _source,
        { dto, id }: { dto: UserDto; id: string },
        { prisma }: GraphQLContext,
      ) => changeUser(id, dto, prisma),
    },

    deleteUser: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: { id: string }, { prisma }: GraphQLContext) =>
        deleteUser(id, prisma),
    },

    subscribeTo: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _source,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma }: GraphQLContext,
      ) => subscribeTo(userId, authorId, prisma),
    },

    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _source,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma }: GraphQLContext,
      ) => unsubscribeFrom(userId, authorId, prisma),
    },

    createProfile: {
      type: ProfileResponse,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: async (
        _source,
        { dto }: { dto: ProfileDto },
        { prisma }: GraphQLContext,
      ) => createProfile(dto, prisma),
    },

    changeProfile: {
      type: ProfileResponse,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        _source,
        { dto, id }: { id: string; dto: ProfileDto },
        { prisma }: GraphQLContext,
      ) => changeProfile(id, dto, prisma),
    },

    deleteProfile: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: { id: string }, { prisma }: GraphQLContext) =>
        deleteProfile(id, prisma),
    },
  },
});
