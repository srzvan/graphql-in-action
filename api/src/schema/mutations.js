import { GraphQLNonNull, GraphQLObjectType } from 'graphql';

import AuthInput from './types/auth-input';
import UserInput from './types/user-input';
import UserPayload from './types/user-payload';

export const MutationType = new GraphQLObjectType({
  description: 'The root mutation entry point of the API',
  name: 'Mutation',
  fields: () => ({
    userCreate: {
      type: new GraphQLNonNull(UserPayload),
      args: {
        input: { type: new GraphQLNonNull(UserInput) },
      },
      resolve: async (_, { input }, { mutators }) => {
        return mutators.userCreate({ input });
      },
    },
    userLogin: {
      type: new GraphQLNonNull(UserPayload),
      args: {
        input: { type: new GraphQLNonNull(AuthInput) },
      },
      resolve: async (_, { input }, { mutators }) => {
        return mutators.userLogin({ input });
      },
    },
  }),
});
