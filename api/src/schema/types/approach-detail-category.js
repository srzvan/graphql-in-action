import { GraphQLEnumType } from 'graphql';

const ApproachDetailCategory = new GraphQLEnumType({
  name: 'ApproachDetailCategory',
  values: {
    NOTE: {},
    WARNING: {},
    EXPLANATION: {},
  },
});

export default ApproachDetailCategory;
