import type { Request, Response } from "express";
import { authInput } from "../types";
import { prisma } from "db/client";


export const signUpController = async (req: Request, res: Response) => {
    const data = authInput.safeParse(req.body);

    if(!data.success) {
        return res.status(403).json({
            message: "Invalid Input"
        })
    }

    if(!data.data) {
        return res.status(500).json({
            message: "data received undefined"
        })
    }

    const username = data.data.username;
    const password = data.data.password;

    try {
        const result_data = await prisma.user.create({
            data : {
                username,
                password
            }
        })

        return res.status(200).json({
            id: result_data.id
        })
    } catch (e) {
        return res.status(403).json({
            error: e
        })
    }
}

export const signInController = async (req: Request, res: Response) => {
    
}