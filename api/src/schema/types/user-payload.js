import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import User from './user';
import UserError from './user-error';

const UserPayload = new GraphQLObjectType({
  description: 'Payload returned by the userCreate & userLogin mutations',
  name: 'UserPayload',
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError))),
    },
    user: { type: User },
    authToken: { type: GraphQLString },
  }),
});

export default UserPayload;
