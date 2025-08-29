

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

        //console.log(`transmitting to ${user_id}`)

        if(ws_user && ws_user.readyState === 1) {
            ws_user.send(JSON.stringify({
                type: "website-down-alert",
                payload: {
                    message: message_payload
                }
            }))
        } else {
            //console.log(`${user_id} connection not successful`)
        }
    })
    //console.log(`Redis subscription setup for publisher stream`)
}

setupRedisSub();

const server = Bun.serve({
    port: 3004,
    fetch(req, server) {
        const t = new URL(req.url);
        //console.log(req.url);
        const user_id = t.searchParams.get("user_id");
        //console.log(user_id);
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

            if(!user_id) {
                ws.close(1008, "user id required");
                return;
            }

            const user_id_exist = user_map.get(user_id);

            if(user_id_exist) {
                //console.log(`user_connection found for ${user_id}`)
                user_id_exist.close(1000, "user found, restarting connection")
            }   

            user_map.set(user_id, ws);
            //console.log(`connection established with websocket ${ws}`)

            ws.send(JSON.stringify({
                type: "connection_established",
                payload: {
                    message: "connection established"
                }
            }))
            
        },
        async message(ws, message) {
            //console.log(`Received ${message}`)
            ws.send(`hello ${message}`)
        },
        async close(ws) {
            const user_id = ws.data?.user_id;

            if(user_id) {
                const user_ws = user_map.get(user_id);
                if(user_ws === ws) {
                    user_map.delete(user_id);
                }
            }
            //console.log(`websocket ${ws} is closing`)

        }
    }
})

process.on("SIGINT", async () => {
    user_map.forEach((ws, userId) => {
        ws.close(1000, "shutting server down");
    })

    user_map.clear();

    await client.pUnsubscribe("notify:*");

    await client.quit();

    //console.log("clean up complete")

    process.exit(0);
})