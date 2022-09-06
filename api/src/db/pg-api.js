import pgClient from './pg-client';
import sqlStatements from './sqls';

async function pgAPIWrapper() {
  const { pgPool: connectionsPool } = await pgClient();

  return {
    taskMainList: async () => {
      const response = await query(sqlStatements.tasksLatest);
      return response.rows;
    },
  };

  function query(text, params = {}) {
    return connectionsPool.query(text, Object.values(params));
  }
}

export default pgAPIWrapper;
