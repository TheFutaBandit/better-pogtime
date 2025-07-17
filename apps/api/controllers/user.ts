import type { Request, Response } from "express";
import { authInput } from "../types";
import { prisma } from "db/client";
import jwt from "jsonwebtoken";




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
        const get_user = await prisma.user.findFirst({
            where : {
                username: username,
            }
        })

        
        if(!get_user) {
            return res.status(403).json({
                message: "username not valid"
            })
        }

        if(get_user.password != password) {
            return res.status(403).json({
                message: "invalid password"
            })
        }

        const secret = process.env.SECRET;

        const token = jwt.sign({username}, secret!);

        return res.status(200).json({
            token
        })


    } catch (e) {
        return res.status(403).json({
            message: "username not valid",
            error: e
        })
    }
}