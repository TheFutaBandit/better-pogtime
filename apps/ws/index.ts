import {client} from "redisstream/client"

const server = Bun.serve({
    port: 3004,
    fetch(req, server) {
        const success = server.upgrade(req);
        if(success) {
            return undefined;
        }
    },
    websocket: {
        async open(ws) {
            console.log(`WE HAVE A CONNECTCTION ${ws}`)
            ws.send(`FUCK YOU ${ws}`)
        },
        async message(ws, message) {
            console.log(`Received ${message}`)
            ws.send(`FUCK YOU ${message}`)
        }
    }
})