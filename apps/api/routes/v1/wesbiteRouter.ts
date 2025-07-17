import { Router } from "express";
import { createWebsiteController, getWebsiteController } from "../../controllers/website";
import { authMiddleware } from "../../authMiddleware";

const websiteRouter = Router();

websiteRouter.post("/", authMiddleware, createWebsiteController);

websiteRouter.get("/status/:website_id", authMiddleware, getWebsiteController);

export default websiteRouter;


