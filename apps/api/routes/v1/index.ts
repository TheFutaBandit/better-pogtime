import { Router } from "express";
import userRouter from "./userRouter";
import websiteRouter from "./wesbiteRouter";

const v1Router = Router();

v1Router.use("/auth", userRouter);

v1Router.use("/website", websiteRouter);



// v1Router.post("/website", async (req, res) => {
//     if(!req.body || !req.body.url) {
//         return res.status(411).json({
//             error: "input error"
//         })
//     }
//     try {
//         const Response = await prismaClient.website.create({
//             data: {
//                 url: req.body.url
//             }
//         })

//         return res.status(200).json({
//             id : Response.id
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error
//         })
//     }
// })

// v1Router.get("/website", (req, res) => {
//     return res.json({
//         message: "hello there"
//     })
// });

export default v1Router;