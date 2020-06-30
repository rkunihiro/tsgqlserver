import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";

export function createExpressServer(apolloMiddleware: express.Router) {
    const app = express();
    app.use(morgan("dev"));
    app.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        session({
            secret: "foobar",
            cookie: {
                path: "/",
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
            },
            name: "sid",
            resave: false,
            saveUninitialized: true,
        }),
    );

    // GraphQL server
    app.use(apolloMiddleware);

    // health check endpoint
    app.get("/", async (_req: Request, res: Response) => {
        res.end(`OK`);
    });

    // Not found
    app.all("*", (_req: Request, res: Response) => {
        res.status(404);
        res.setHeader("Content-Type", "text/plain;charset=UTF-8");
        res.end("not found");
    });

    // Error handler
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err);
        res.status(500);
        res.setHeader("Content-Type", "text/plain;charset=UTF-8");
        res.end("internal server error");
    });

    return app;
}
