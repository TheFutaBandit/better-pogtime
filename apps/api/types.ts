import * as z from "zod";

export const authInput = z.object({
    username: z.string(),
    password: z.string()
})

export const websiteInput = z.object({
    url: z.string(),
})

export const websiteRowInput = z.object({
    url: z.string(),
    region: z.string(),
    response_time: z.number(),
    status: z.any()
})

export const website_notify_input = z.object({
    url: z.string(),
    id: z.string()
})