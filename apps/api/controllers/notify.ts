import type { Request, Response } from "express";
import { website_notify_input, websiteInput } from "../types";
import { prisma } from "db/client";
import { publishToWebsocket} from "redisstream/notification-client"

export const notifyController = async (req: Request, res: Response) => {
    const website_data = website_notify_input.safeParse(req.body);

    if(!website_data.success) {
        res.status(400).json({
            message: "incorrect input body"
        })
    }

    if(!website_data.data) {
        return res.status(500).json({
            message: "data received undefined"
        })
    }

    const {url, id} = website_data.data;

    try {
        const get_user_ids = await prisma.website.findMany({
            where: {
                id: id,
                url: url
            }, 
            select : {
                user_id: true
            }
        })

        if(!get_user_ids) {
            return res.status(400).json({
                message: "error fetching user-ids"
            })
        }

        get_user_ids.map(async (item) => {
            const u_id = item.user_id;
            const insert_notification = await prisma.notifications.create({
                data: {
                    user_id: u_id,
                    content: `website id - ${id}, url - ${url} has gone down! FIX YO SHIT`
                }
            })

            if(!insert_notification) {
                return res.status(500).json({
                    message: "internal server failure"
                })
            }

            await publishToWebsocket(u_id, id, url);

        })

        res.status(200).json({
            message: "notification success"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Prisma Error in getting user_ids"
        })
    }
}
