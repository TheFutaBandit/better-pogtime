import { createClient } from "redis";


const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .on('connect', () => console.log("hurrah"))
  .connect();

type websiteInput = {
    url: String,
    id: String
}

async function xAdd({url, id} : websiteInput) {
    await client.xAdd(
        "betteruptime:website",
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
