/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server
 */

import cors from "cors";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";

import * as config from "./config";
import { schema, rootValue } from "./schema";

async function main() {
  const server = express();
  server.use(cors());
  server.use(morgan("dev"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use("/:fav.ico", (req, res) => res.sendStatus(204));

  // Example route
  server.use("/", graphqlHTTP({ schema, rootValue, graphiql: true }));

  // This line runs the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}

main();
