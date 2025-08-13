import { Router } from "express";
import { getUserNotificationController, notifyController } from "../../controllers/notify";
import { authMiddleware } from "../../authMiddleware";

const notifyRouter = Router();

notifyRouter.post("/", notifyController)

notifyRouter.get("/", authMiddleware, getUserNotificationController)

export default notifyRouter;