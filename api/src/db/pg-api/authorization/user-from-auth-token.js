export function userFromAuthToken(query) {
  return async (authToken) => {
    if (!authToken) {
      return null;
    }

    const response = await query(statement, {
      $1: authToken,
    });

    return response.rows[0];
  };
}

const statement = `
  SELECT id, username, first_name AS "firstName", last_name AS "lastName", created_at AS "createdAt"
  FROM azdev.users
  WHERE hashed_auth_token = crypt($1, hashed_auth_token)
`;
