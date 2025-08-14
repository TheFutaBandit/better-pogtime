import { Router } from "express";
import { getUserNotificationController, markReadUserNotifications, notifyController } from "../../controllers/notify";
import { authMiddleware } from "../../authMiddleware";

const notifyRouter = Router();

notifyRouter.post("/", notifyController)

notifyRouter.get("/", authMiddleware, getUserNotificationController)

notifyRouter.post("/markAllRead", authMiddleware, markReadUserNotifications)

export default notifyRouter;