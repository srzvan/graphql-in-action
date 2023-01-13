import { pgClient } from '../clients/pg-client';

import { userFromAuthToken } from './authorization/user-from-auth-token';

import { getUsersById } from './loaders/get-users-by-id';
import { approachLists } from './loaders/approach-lists';
import { getTasksById } from './loaders/get-tasks-by-id';
import { searchResults } from './loaders/search-results';
import { getTasksByTypes } from './loaders/get-tasks-by-types';
import { getTaskListsByUserIds } from './loaders/get-task-lists-by-user-ids';

import { userLogin } from './mutators/user-login';
import { userCreate } from './mutators/user-create';
import { taskCreate } from './mutators/task-create';
import { taskUpdate } from './mutators/task-update';
import { approachCreate } from './mutators/approach-create';

async function pgAPIWrapper() {
  const { pgPool: connectionsPool } = await pgClient();

  return {
    authorization: {
      userFromAuthToken: userFromAuthToken(query),
    },
    loaders: {
      getTasksByTypes: getTasksByTypes(query),
      getUsersById: getUsersById(query),
      approachLists: approachLists(query),
      getTasksById: getTasksById(query),
      getTaskListsByUserIds: getTaskListsByUserIds(query),
      searchResults: searchResults(query),
    },
    mutators: {
      userCreate: userCreate(query),
      userLogin: userLogin(query),
      taskCreate: taskCreate(query),
      taskUpdate: taskUpdate(query),
      approachCreate: approachCreate(query),
    },
  };

  function query(text, params = {}) {
    return connectionsPool.query(text, Object.values(params));
  }
}

export default pgAPIWrapper;
