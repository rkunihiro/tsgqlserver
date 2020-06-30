import gql from "graphql-tag";

export const typeDefs = gql`
    type Query {
        hello(message: String): String!
    }

    type Mutation {
        incl(add: Int): Int!
        decl(sub: Int): Int!
    }

    type Schema {
        query: Query
        mutation: Mutation
    }
`;
