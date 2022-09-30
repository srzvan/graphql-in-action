import { pgClient } from '../clients/pg-client';
import { getUsersById } from './get-users-by-id';
import { approachLists } from './approach-lists';
import { getTasksById } from './get-tasks-by-id';
import { searchResults } from './search-results';
import { getTasksByTypes } from './get-tasks-by-types';

async function pgAPIWrapper() {
  const { pgPool: connectionsPool } = await pgClient();

  return {
    getTasksByTypes: getTasksByTypes(query),
    getUsersById: getUsersById(query),
    approachLists: approachLists(query),
    getTasksById: getTasksById(query),
    searchResults: searchResults(query),
  };

  function query(text, params = {}) {
    return connectionsPool.query(text, Object.values(params));
  }
}

export default pgAPIWrapper;
