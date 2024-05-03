import { ApolloServerPluginLandingPageGraphQLPlayground as Playground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server";
import { connectToDb } from "./db/db.js";
import { schema } from "./graphql/schema.js";


async function initServer() {
  try {
    await connectToDb();
    
    
   

    const typeDefs = gql`
      type Person {
          name: String
        }

      type Query {
          me: Person,
      }`;
    
      const resolvers = {
        Query: {
          me: () => {
            return {
              name: "Hannes",
            };
          },
      }
      }

    const server = new ApolloServer({
      schema,
      plugins: [Playground()]
    });
    
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });

    
  } catch (error) {
    throw new Error(error);
  }
}

initServer();
