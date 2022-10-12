import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

const UserError = new GraphQLObjectType({
  description: 'Error type for the createUser mutation',
  name: 'UserError',
  fields: () => ({
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export default UserError;
