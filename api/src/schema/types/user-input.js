import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const UserInput = new GraphQLInputObjectType({
  description: 'Input for the userCreate mutation',
  name: 'UserInput',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

export default UserInput;
