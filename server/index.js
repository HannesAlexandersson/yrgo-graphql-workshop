import { ApolloServerPluginLandingPageGraphQLPlayground as Playground } from "apollo-server-core";
import { connectToDb } from "./db/db.js";

async function initServer() {
  try {
    await connectToDb();
    /**
     * Code here!
     */
  } catch (error) {
    throw new Error(error);
  }
}

initServer();
