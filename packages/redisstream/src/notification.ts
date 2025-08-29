import { getClient } from "./client";

export const client = await getClient();

export async function publishToWebsocket(user_id: string, website_id: string, website_url: string) {
    await client.publish(`notify:${user_id}`, JSON.stringify({message: `${website_url} has gone down!`}))
}