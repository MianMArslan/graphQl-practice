import express from "express";
import { resolvers } from "./resoulvers.mjs";
import schema from "./schema.mjs";

import { graphqlHTTP } from "express-graphql";

const app = express();
app.get("/", (req, res) => {
  res.send("up and running with graphql course course");
});

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8082, () => console.log("listen on port 8082"));
