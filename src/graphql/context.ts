import type { ExpressContext } from "apollo-server-express";

export interface Context {
    session: { [key: string]: any };
}

export async function context({ req }: ExpressContext): Promise<Context> {
    if (!req.session) {
        throw new Error(`session is disabled`);
    }
    return {
        session: req.session,
    };
}
