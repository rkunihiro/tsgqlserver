import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        hello(message: String): String!
    }

    type Mutation {
        incl(add: Int): Int!
        decl(sum: Int): Int!
    }

    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default typeDefs;
