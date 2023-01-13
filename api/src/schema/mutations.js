import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import AuthInput from './types/auth-input';
import UserInput from './types/user-input';
import TaskInput from './types/task-input';
import TaskPayload from './types/task-payload';
import UserPayload from './types/user-payload';
import ApproachInput from './types/approach-input';
import ApproachPayload from './types/approach-payload';
import TaskUpdateInput from './types/task-update-input';

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
    taskCreate: {
      type: TaskPayload,
      args: {
        input: { type: new GraphQLNonNull(TaskInput) },
      },
      resolve: (_, { input }, { mutators, currentUser }) => {
        return mutators.taskCreate({ input, currentUser });
      },
    },
    taskUpdate: {
      type: TaskPayload,
      args: {
        input: { type: new GraphQLNonNull(TaskUpdateInput) },
      },
      resolve: (_, { input }, { mutators, currentUser }) => {
        return mutators.taskUpdate({ input, currentUser });
      },
    },
    approachCreate: {
      type: ApproachPayload,
      args: {
        taskId: { type: GraphQLNonNull(GraphQLID) },
        input: { type: GraphQLNonNull(ApproachInput) },
      },
      resolve: async (_, { taskId, input }, { mutators, currentUser }) => {
        return mutators.approachCreate({ taskId, currentUser, input, mutators });
      },
    },
  }),
});
