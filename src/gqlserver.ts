import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { context } from "./graphql/context";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolver";

export const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
