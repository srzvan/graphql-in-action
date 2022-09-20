import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User entity',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: GraphQLString,
      resolve: (source) =>
        [source.firstName, source.lastName].filter(Boolean).join(' '),
    },
    username: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.createdAt.toISOString(),
    },
  },
});

export default User;
