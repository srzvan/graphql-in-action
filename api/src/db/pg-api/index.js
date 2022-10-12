import { pgClient } from '../clients/pg-client';

import { getUsersById } from './loaders/get-users-by-id';
import { approachLists } from './loaders/approach-lists';
import { getTasksById } from './loaders/get-tasks-by-id';
import { searchResults } from './loaders/search-results';
import { getTasksByTypes } from './loaders/get-tasks-by-types';

import { userCreate } from './mutators/user-create';

async function pgAPIWrapper() {
  const { pgPool: connectionsPool } = await pgClient();

  return {
    loaders: {
      getTasksByTypes: getTasksByTypes(query),
      getUsersById: getUsersById(query),
      approachLists: approachLists(query),
      getTasksById: getTasksById(query),
      searchResults: searchResults(query),
    },
    mutators: {
      userCreate: userCreate(query),
    },
  };

  function query(text, params = {}) {
    return connectionsPool.query(text, Object.values(params));
  }
}

export default pgAPIWrapper;
