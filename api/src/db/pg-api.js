import { pgClient } from './pg-client';
import { statements as sqlStatements } from './sqls';

async function pgAPIWrapper() {
  const { pgPool: connectionsPool } = await pgClient();

  return {
    taskMainList: async () => {
      const response = await query(sqlStatements.tasksLatest);
      return response.rows;
    },
    userInfo: async (id) => {
      const response = await query(sqlStatements.usersFromIds, { $1: [id] });
      return response.rows[0];
    },
  };

  function query(text, params = {}) {
    return connectionsPool.query(text, Object.values(params));
  }
}

export default pgAPIWrapper;
