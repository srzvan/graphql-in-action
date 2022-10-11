import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import DataLoader from 'dataloader';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema';
import * as config from './config';
import pgAPIWrapper from './db/pg-api';
import mongoAPIWrapper from './db/mongo-api';

async function main() {
  const server = express();
  server.use(cors());
  server.use(morgan('dev'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use('/:fav.ico', (req, res) => res.sendStatus(204));

  const pgAPI = await pgAPIWrapper();
  const mongoAPI = await mongoAPIWrapper();

  server.use('/', (req, res) => {
    const loaders = {
      getUsersById: new DataLoader((userIds) => pgAPI.loaders.getUsersById(userIds)),
      approachLists: new DataLoader((taskIds) =>
        pgAPI.loaders.approachLists(taskIds)
      ),
      getTasksById: new DataLoader((taskIds) => pgAPI.loaders.getTasksById(taskIds)),
      getTasksByType: new DataLoader((types) =>
        pgAPI.loaders.getTasksByTypes(types)
      ),
      searchResults: new DataLoader((searchTerms) =>
        pgAPI.loaders.searchResults(searchTerms)
      ),
      getDetailListsByApproachIds: new DataLoader((approachIds) =>
        mongoAPI.loaders.getDetailListsByApproachIds(approachIds)
      ),
    };

    const mutators = {
      ...pgAPI.mutators,
      ...mongoAPI.mutators,
    };

    graphqlHTTP({
      schema,
      graphiql: true,
      customFormatErrorFn,
      context: { loaders },
    })(req, res);
  });

  // This line runs the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}

function customFormatErrorFn(error) {
  const GENERIC_ERROR = { message: 'Oops! Something went wrong! :(' };
  const report = {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  };

  console.error('GraphQL Error', report);

  return config.isDev ? report : GENERIC_ERROR;
}

main();
