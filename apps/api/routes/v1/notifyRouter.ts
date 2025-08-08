import { Router } from "express";
import { notifyController } from "../../controllers/notify";

const notifyRouter = Router();

notifyRouter.post("/", notifyController)

export default notifyRouter;