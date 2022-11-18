import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';

import Task from './task';
import UserError from './user-error';

const TaskPayload = new GraphQLObjectType({
  name: 'TaskPayload',
  description: 'Payload of the taskCreate mutation',
  fields: () => ({
    errors: { type: new GraphQLNonNull(new GraphQLList(GraphQLNonNull(UserError))) },
    task: { type: Task },
  }),
});

export default TaskPayload;
