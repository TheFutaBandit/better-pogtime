import axios from "axios";
import {prisma} from "db/client";
import { xGroupRead, xAckBulk } from "redisstream/client";
//import something that like lets you read in groups 

const REGION_ID = process.env.REGION_ID || "13b23acd-e69b-43b3-a23e-48f985d56793";
const CONSUMER_ID = process.env.CONSUMER_ID || "india-1";

type Message = {
    id: string,
    message: {
        url: string,
        id: string
    }
}

type Group = {
    name: string,
    messages: Message[]
}

type groupReadData = Group[];

const g_i = "13b23acd-e69b-43b3-a23e-48f985d56793";
const c_i = "india-1";


async function main() {
    while(1) {
        //we should be reading the data from the stream as a consumer group
    const data : any = await xGroupRead(REGION_ID!, CONSUMER_ID!);

    // console.log(`The data we have received is ${data}`);

    if(!data) {
        continue;
    }
    // @ts-ignore
    console.log(data[0].messages.length);


    //after we have the data, we send each website a axios get request, if yes, prisma up, else prisma down
    const worker_data = data[0].messages;

    const promise = worker_data!.map(async (item : Message) => {
        new Promise<void>((resolve, reject) => {
            const timeGet = item.id.slice(0,-3);
            const website_url = item.message.url;
            console.log(website_url);
            const website_id = item.message.id;
            const startTime = Date.now();

            axios.get(website_url)
                .then(async () => {
                    const endTime = Date.now();
                    const response_time = endTime - startTime;
                    await prisma.website_tick.create({
                        data : {
                            response_time_ms: response_time,
                            status: 'UP',
                            website_id,
                            region_id: REGION_ID!
                        }
                    })
                    resolve;
                })
                .catch(async () => {
                    const endTime = Date.now();
                    const response_time = endTime - startTime;;
                    await prisma.website_tick.create({
                        data : {
                            response_time_ms: response_time,
                            status: 'DOWN',
                            website_id,
                            region_id: REGION_ID!
                        }
                    })
                    resolve;
                })
            })
    })

    await Promise.all(promise)
    
    console.log("done");
        

    //send a xack
    await xAckBulk(REGION_ID!, data[0].messages)

    console.log("ack sent");
    }
}

main();