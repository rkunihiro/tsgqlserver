import type { Resolvers } from "../generated/type";
import type { Context } from "./context";

export const resolvers: Resolvers<Context> = {
    Query: {
        async hello(_parent, { message }) {
            return `Hello world! ${message ?? ""}`;
        },
    },

    Mutation: {
        async incl(_parent, { add }, { session }) {
            const v = add ?? 1;
            if (!session.counter) {
                session.counter = 0;
            }
            session.counter += v;
            return session.counter;
        },

        async decl(_parent, { sub }, { session }) {
            const v = sub ?? 1;
            if (!session.counter) {
                session.counter = 0;
            }
            session.counter -= v;
            return session.counter;
        },
    },
};
