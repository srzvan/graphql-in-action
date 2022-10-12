import { randomString } from '../../../utils';

export function userCreate(query) {
  return async ({ input }) => {
    const payload = { errors: [] };

    if (input.password.length < 6) {
      payload.errors.push({ message: ERRORS.minLength });
    }

    if (payload.errors.length === 0) {
      const authToken = randomString();
      const response = await query(statement, {
        $1: input.username.toLowerCase(),
        $2: input.password,
        $3: input.firstName,
        $4: input.lastName,
        $5: authToken,
      });
      const user = response.rows[0];

      if (user) {
        payload.user = user;
        payload.authToken = authToken;
      }
    }

    return payload;
  };
}

const ERRORS = {
  minLength: 'The password must have more than 6 characters',
};

const statement = `
  INSERT INTO azdev.users (username, hashed_password, first_name, last_name, hashed_auth_token)
  VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, crypt($5, gen_salt('bf')))
  RETURNING id, username, first_name AS "firstName", last_name AS "lastName", created_at AS "createdAt"
`;
