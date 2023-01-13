import { GraphQLEnumType } from 'graphql';

const ApproachDetailCategory = new GraphQLEnumType({
  name: 'ApproachDetailCategory',
  values: {
    NOTE: { value: 'notes' },
    WARNING: { value: 'warnings' },
    EXPLANATION: { value: 'explanations' },
  },
});

export default ApproachDetailCategory;
