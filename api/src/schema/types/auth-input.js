import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

const AuthInput = new GraphQLInputObjectType({
  description: 'Input required for the userLogin mutation',
  name: 'AuthInput',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default AuthInput;
