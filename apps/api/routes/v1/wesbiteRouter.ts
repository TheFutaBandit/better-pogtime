import { Router } from "express";
import { createWebsiteController, getWebsiteController } from "../../controllers/website";

const websiteRouter = Router();

websiteRouter.post("/", createWebsiteController);

websiteRouter.get("/", getWebsiteController);

export default websiteRouter;


