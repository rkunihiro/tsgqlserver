import http from "http";

import app from "./app";

export const server = http.createServer(app);

const port = 3000;

server.listen(port, () => {
    console.log(`server start port:${port}`);
});
