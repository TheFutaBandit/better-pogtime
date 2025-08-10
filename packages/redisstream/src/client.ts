import { createClient } from "redis";

export const getClient = async () => {
    return await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .on('connect', () => console.log("hurrah"))
    .connect();
}