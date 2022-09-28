import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import User from './user';
import Task from './task';
import ApproachDetail from './approach-detail';
import SearchResultItem from './search-result-item';

const Approach = new GraphQLObjectType({
  name: 'Approach',
  description: 'An Approach is a possible solution for a Task',
  interfaces: () => [SearchResultItem],
  // isTypeOf: (source) => source instanceof Approach,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.createdAt.toISOString(),
    },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, _, { loaders }) => loaders.getUsersById.load(source.userId),
    },
    task: {
      type: new GraphQLNonNull(Task),
      resolve: (source, _, { loaders }) => loaders.getTasksById.load(source.taskId),
    },
    detailList: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ApproachDetail))),
      resolve: (source, _, { loaders }) =>
        loaders.getDetailListsByApproachIds.load(source.id),
    },
  }),
});

export default Approach;
