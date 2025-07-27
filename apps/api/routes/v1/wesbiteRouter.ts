import { Router } from "express";
import { createWebsiteController, getUserWebsite, getWebsiteController, getWebsiteTickController } from "../../controllers/website";
import { authMiddleware } from "../../authMiddleware";

const websiteRouter = Router();

websiteRouter.post("/", authMiddleware, createWebsiteController);

websiteRouter.get("/", authMiddleware, getUserWebsite);

websiteRouter.get("/status/:website_id", authMiddleware, getWebsiteController);

websiteRouter.get("/website-tick-history", authMiddleware, getWebsiteTickController)




export default websiteRouter;


