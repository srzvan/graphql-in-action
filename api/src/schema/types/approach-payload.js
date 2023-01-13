import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';

import Approach from './approach';
import UserError from './user-error';

const ApproachPayload = new GraphQLObjectType({
  name: 'ApproachPayload',
  description: 'Payload of the `approachCreate` mutation',
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError))),
    },
    approach: { type: Approach },
  }),
});

export default ApproachPayload;
