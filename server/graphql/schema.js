import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { __dirname } from "../util.js";
import { authorResolver, bookResolver } from "./resolvers/index.js";

const typesLoader = loadFilesSync(
  path.join(__dirname, "/graphql/typedefinitions/typeDefs.graphql")
);

const typeDefs = mergeTypeDefs(typesLoader);
const resolvers = mergeResolvers([authorResolver, bookResolver]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
