import { Router } from "express";
import { createWebsiteController, deleteWebsiteController, getUserWebsite, getWebsiteController, getWebsiteTickController } from "../../controllers/website";
import { authMiddleware } from "../../authMiddleware";

const websiteRouter = Router();

websiteRouter.post("/", authMiddleware, createWebsiteController);

websiteRouter.get("/", authMiddleware, getUserWebsite);

websiteRouter.get("/status/:website_id", authMiddleware, getWebsiteController);

websiteRouter.get("/tick-history", authMiddleware, getWebsiteTickController)

websiteRouter.delete("/", authMiddleware, deleteWebsiteController);




export default websiteRouter;


