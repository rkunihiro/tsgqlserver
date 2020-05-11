import type { Context } from "./context";

export const resolvers = {
    Query: {
        async hello(_parent: any, args: { message?: string }, {}: Context, _info: any) {
            return `Hello world! ${args.message ?? ""}`;
        },
    },

    Mutation: {
        async incl(_parent: any, args: { add?: number }, { session }: Context, _info: any) {
            const v = (args.add as number) ?? 1;
            if (!session.counter) {
                session.counter = 0;
            }
            session.counter += v;
            return session.counter;
        },

        async decl(_parent: any, args: { sub?: number }, { session }: Context, _info: any) {
            const v = (args.sub as number) ?? 1;
            if (!session.counter) {
                session.counter = 0;
            }
            session.counter -= v;
            return session.counter;
        },
    },
};
