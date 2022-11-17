import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import Task from './task';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User entity',
  fields: () => fieldsWrapper({ meScope: false }),
});

export const Me = new GraphQLObjectType({
  name: 'Me',
  description: 'Me user entity',
  fields: () => fieldsWrapper({ meScope: true }),
});

function fieldsWrapper({ meScope }) {
  const userFields = {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: GraphQLString,
      resolve: (source) =>
        [source.firstName, source.lastName].filter(Boolean).join(' '),
    },
    username: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.createdAt.toISOString(),
    },
  };

  if (meScope) {
    userFields.taskList = {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Task))),
      resolve: (_, __, { loaders, currentUser }) => {
        return loaders.getTaskListsByUserIds.load(currentUser.id);
      },
    };
  }

  return userFields;
}

export default User;
