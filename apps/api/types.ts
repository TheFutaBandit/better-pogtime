import * as z from "zod";

export const authInput = z.object({
    username: z.string(),
    password: z.string()
})

export const websiteInput = z.object({
    url: z.string(),
})