import { ApolloServer } from "apollo-server-express";

import { context } from "./graphql/context";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolver";

export const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    playground: {
        settings: {
            "request.credentials": "include", // send cookie for session
        },
    },
});

export default gqlServer;
