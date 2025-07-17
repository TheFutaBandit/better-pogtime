import * as z from "zod";

export const authInput = z.object({
    username: z.string(),
    password: z.string()
})