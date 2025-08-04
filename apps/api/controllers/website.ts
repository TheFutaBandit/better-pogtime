import { prisma } from "db/client";
import type { Request, Response } from "express";
import { websiteInput, websiteRowInput } from "../types";

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

export const getUserWebsite = async (req: Request, res: Response) => {
    const user_id = req.user_id;

    try {
        const website_data = await prisma.website.findMany({
            where : {
                user_id
            },
            select : {
                url : true,
                website_ticker : {
                    select : {
                        response_time_ms: true,
                        status: true,
                        region : {
                            select : {
                                name: true
                            }
                        }
                    },
                    orderBy : {
                        createdAt: "desc"
                    },
                    take: 1
                }

            }
        })

        if(website_data === undefined) {
            return res.status(403).json({
                message: "data is undefined"
            })
        }

        return res.status(200).json({
            message: "Received Website Data",
            data: website_data
        })
    } catch (err) {
        res.status(500).json({
            message: "error with data fetching"
        })
    }
}

export const getWebsiteTickController = async (req: Request, res: Response) => {
    const user_id = req.user_id;

    try {
        const website_tick_data = await prisma.website.findMany({
            where : {
                user_id
            },
            select : {
                url : true,
                website_ticker : {
                    select : {
                        response_time_ms: true,
                        status: true,
                        region : {
                            select : {
                                name: true
                            }
                        },
                        createdAt: true
                    },
                    orderBy : {
                        createdAt: "desc"
                    },
                }

            }
        })

        if(website_tick_data === undefined) {
            return res.status(403).json({
                message: "data is undefined"
            })
        }

        return res.status(200).json({
            message: "Received Website Data",
            data: website_tick_data
        })
    } catch (err) {
        res.status(500).json({
            message: "error with data fetching"
        })
    }
}

export const deleteWebsiteController = async (req: Request, res: Response) => {

    const website_data = websiteRowInput.safeParse(req.body);

    if(!website_data.success) {
        return res.status(403).json({
            message: "invalid website body"
        })
    }

    const url = website_data.data.url;

    const user_id = req.user_id;

    console.log(url);


    try {
        const website_tick_data = await prisma.website.findFirst({
            where : {
                url,
                user_id
            },
        })

        console.log(website_tick_data);

        if(website_tick_data === undefined) {
            return res.status(403).json({
                message: "data not found"
            })
        }

        const deleteRequest = await prisma.website.deleteMany({
            where : {
                url,
                user_id
            }
        })

        return res.status(200).json({
            message: "successful website deletion",
            data: deleteRequest
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            
            message: "error with data deletion"
        })
    }
}

