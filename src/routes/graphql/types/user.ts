import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileResponse } from './profile.js';
import { GraphQLContext, Subscribe } from './common.js';
import { PostResponse } from './post.js';

export const UserResponse: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserResponse',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileResponse,
      resolve: async ({ id }: { id: string }, _args, { profileLoader }: GraphQLContext) =>
        profileLoader.load(id),
    },

    posts: {
      type: new GraphQLList(PostResponse),
      resolve: async ({ id }: { id: string }, _args, { postsLoader }: GraphQLContext) =>
        postsLoader.load(id),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserResponse),
      resolve: async (
        { userSubscribedTo }: { id: string; userSubscribedTo?: Subscribe[] },
        _args,
        { usersLoader }: GraphQLContext,
      ) =>
        usersLoader.loadMany(
          userSubscribedTo ? userSubscribedTo.map(({ authorId }) => authorId) : [],
        ),
    },

    subscribedToUser: {
      type: new GraphQLList(UserResponse),
      resolve: async (
        { subscribedToUser }: { id: string; subscribedToUser?: Subscribe[] },
        _args,
        { usersLoader }: GraphQLContext,
      ) =>
        usersLoader.loadMany(
          subscribedToUser
            ? subscribedToUser.map(({ subscriberId }) => subscriberId)
            : [],
        ),
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
