import { createServer } from "http";

import { gqlServer } from "./gqlserver";
import { createExpressServer } from "./app";

const port = 3000;

(async () => {
    await gqlServer.start();

    const app = createExpressServer(
        gqlServer.getMiddleware({ path: "/graphql" }),
    );

    const server = createServer(app);

    server.listen(port, () => {
        console.log(`server start port:${port}`);
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
