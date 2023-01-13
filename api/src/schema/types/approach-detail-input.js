import { GraphQLNonNull, GraphQLInputObjectType, GraphQLString } from 'graphql';

import ApproachDetailCategory from './approach-detail-category';

const ApproachDetailInput = new GraphQLInputObjectType({
  name: 'ApproachDetailInput',
  description:
    'Part of the `ApproachInput` required by the `approachCreate` mutation',
  fields: () => ({
    content: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(ApproachDetailCategory) },
  }),
});

export default ApproachDetailInput;
