import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';

const TaskUpdateInput = new GraphQLInputObjectType({
  name: 'TaskUpdateInput',
  description:
    'Required input for the taskUpdate mutation. At least one of `content`, `tags`, `isPrivate` fields must be part of the input object in order to perform an update.',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: GraphQLString },
    tags: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
    },
    isPrivate: { type: GraphQLBoolean },
  }),
});

export default TaskUpdateInput;
