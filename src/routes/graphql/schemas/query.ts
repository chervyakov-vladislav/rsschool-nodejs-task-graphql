import { GraphQLObjectType, GraphQLString } from 'graphql';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    testString: {
      type: GraphQLString,
      resolve: async () => {
        return 'Hello';
      },
    },
  },
});
