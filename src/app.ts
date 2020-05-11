import express from "express";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";

import gqlServer from "./gqlserver";

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "foobar",
        cookie: { path: "/", httpOnly: true, secure: false, maxAge: 3600000 },
        name: "sid",
        resave: false,
        saveUninitialized: true,
    }),
);
// health check endpoint
app.get("/", async (_, res) => {
    res.end(`OK`);
});
// GraphQL endpoint
gqlServer.applyMiddleware({
    app,
    path: "/query",
});
// Not found
app.all("*", (_, res) => {
    res.status(404);
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.end("not found");
});
// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500);
    res.setHeader("Content-Type", "text/plain;charset=UTF-8");
    res.end("internal server error");
});

export default app;
