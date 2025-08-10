
import {client} from "redisstream/notification-client"



type WebSocketData = {
    user_id: string
}

const user_map = new Map<string, Bun.ServerWebSocket<WebSocketData>>();
//there might not be a need for this

async function setupRedisSub() {
    await client.pSubscribe("notify:*", (message, channel) => {
        const user_id = channel.split(':')[1];

        const message_payload = JSON.parse(message);
        
        const ws_user = user_map.get(user_id!); //fix this

        if(ws_user && ws_user.readyState === 1) {
            ws_user.send(JSON.stringify({
                type: "website-down-alert",
                payload: {
                    message: message_payload
                }
            }))
        } else {
            console.log(`${user_id} connection not successful`)
        }
    })
    console.log(`Redis subscription setup for publisher stream`)
}

setupRedisSub();

const server = Bun.serve({
    port: 3004,
    fetch(req, server) {
        const t = new URL(req.url);
        const user_id = t.searchParams.get("user_id");
        const success = server.upgrade(req, {
            data : {
                user_id
            }
        });
        if(success) {
            return undefined;
        }
    },
    websocket: {
        async open(ws: Bun.ServerWebSocket<WebSocketData>) {
            const user_id = ws.data?.user_id;
            user_map.set(user_id, ws);
            console.log(`connection established with websocket ${ws}`)
            
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