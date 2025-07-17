import { prisma } from "db/client";
import type { Request, Response } from "express";
import { websiteInput } from "../types";

export const createWebsiteController = async (req: Request, res: Response) => {
    const url_data = websiteInput.safeParse(req.body);

    if(!url_data.success) {
        return res.status(403).json({
            message: "invalid website body"
        })
    }

    const user_id = req.user_id;

    try {
        const website_response = await prisma.website.create({
            data: {
                url: url_data.data!.url,
                user_id: user_id!
            }
        })

        res.status(200).json({
            id: website_response.id
        })
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "error in putting in db"
        })
    }
}

export const getWebsiteController = async (req: Request, res: Response) => {
    const website_id = req.params.website_id;
    const user_id = req.user_id;

    if(!website_id) {
        return res.status(403).json({
            message: "Error receiving website_id"
        })
    }

    try {
        const website_response = await prisma.website.findFirst({
            where : {
                user_id: user_id,
                id: website_id
            },
            include : {
                website_ticker: {
                    take: 1,
                    orderBy: [{createdAt: 'desc'}]
                }
            }
        })

        if(!website_response) {
            return res.status(403).json({
                message: "no website found"
            })
        }



        return res.status(200).json({
            website_response: website_response
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "DB error"
        })
    }
}