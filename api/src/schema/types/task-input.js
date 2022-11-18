import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';

const TaskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  description: 'Required input for the taskCreate mutation',
  fields: () => ({
    content: { type: new GraphQLNonNull(GraphQLString) },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    },
    isPrivate: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

export default TaskInput;
