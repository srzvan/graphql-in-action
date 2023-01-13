import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';

import ApproachDetailInput from './approach-detail-input';

const ApproachInput = new GraphQLInputObjectType({
  name: 'ApproachInput',
  description: 'Required input for the approachCreate mutation',
  fields: () => ({
    content: { type: new GraphQLNonNull(GraphQLString) },
    detailList: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ApproachDetailInput))
      ),
    },
  }),
});

export default ApproachInput;
