import { createClient } from "redis";

const STREAM_NAME = "betteruptime:website";


const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .on('connect', () => console.log("hurrah"))
  .connect();

type websiteInput = {
    url: String,
    id: String
}

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

async function xAdd({url, id} : websiteInput) {
    await client.xAdd(
        STREAM_NAME,
        "*",
        {
            "url" : `${url}`,
            "id" : `${id}`
        }
    )
}

export async function xAddBulk(input_website : websiteInput[]) {
    input_website.map(async (item) => {
        let url = item.url;
        let id = item.id;
        await xAdd({url, id});
    })
}

export async function xGroupRead(group_id: string, consumer_id: string) : Promise<any> {
    const res = await client.xReadGroup(
        group_id,
        consumer_id,
        {
            key: STREAM_NAME,
            id: '>'
        }, 
        {
            COUNT: 5
        }
    );

    return res;
}

async function xAck(group_id: string, stream_id: string) {
    await client.xAck(STREAM_NAME, group_id, stream_id);
}

export async function xAckBulk(group_id: string, data : any) {
    data.map(async (item : any) => {
        await xAck(group_id, item.id);
    })
}
