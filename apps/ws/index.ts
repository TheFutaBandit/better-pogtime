import {client} from "redisstream/notification-client"



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
            await client.pSubscribe("notify:*", (channel, message) => {
                ws.send(`HELLO MOTHERFUCKER ${message}`)
            })
        },
        async message(ws, message) {
            console.log(`Received ${message}`)
            ws.send(`hello ${message}`)
        },
        async close(ws) {
            console.log(`websocket ${ws} is closing`)
            client.pUnsubscribe("notify:*");
        }
    }
})