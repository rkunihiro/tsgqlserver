import type * as express from "express";

export type Context = {
    session: { [key: string]: any };
};

export const context = async ({ req: { session } }: { req: express.Request }): Promise<Context> => {
    if (!session) {
        throw new Error(`session is disabled`);
    }
    return {
        session,
    };
};

export default context;
