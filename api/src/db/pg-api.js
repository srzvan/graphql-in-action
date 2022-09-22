import { pgClient } from './pg-client';
import { convertArrayToObjectById } from '../utils';
import { statements as sqlStatements } from './sqls';

export const TASKS_TYPES = {
  latest: 'latest',
};

async function pgAPIWrapper() {
  const { pgPool: connectionsPool } = await pgClient();

  return {
    getTasksByTypes: async (types) => {
      const results = types.map(async (type) => {
        if (type === TASKS_TYPES.latest) {
          const response = await query(sqlStatements.tasksLatest);

          return response.rows;
        }

        throw new Error('Unsupported tasks type');
      });

      return Promise.all(results);
    },
    getUsersById: async (ids) => {
      const response = await query(sqlStatements.usersFromIds, { $1: ids });
      const users = convertArrayToObjectById(response.rows);

      return ids.map((id) => users[id]);
    },
    approachLists: async (taskIds) => {
      const response = await query(sqlStatements.approachesForTaskIds, {
        $1: taskIds,
      });

      return taskIds.map((taskId) =>
        response.rows.filter((row) => taskId === row.taskId)
      );
    },
    getTasksById: async (taskIds) => {
      const response = await query(sqlStatements.tasksFromIds, {
        $1: taskIds,
        $2: null, // TODO: pass logged-in userId here.
      });

      return taskIds.map((taskId) => response.rows.find((row) => taskId == row.id));
    },
    searchResults: async (searchTerms) => {
      const results = searchTerms.map(async (term) => {
        const response = await query(sqlStatements.searchResults, {
          $1: term,
          $2: null,
        });

        return response.rows;
      });

      return Promise.all(results);
    },
  };

  function query(text, params = {}) {
    return connectionsPool.query(text, Object.values(params));
  }
}

export default pgAPIWrapper;
