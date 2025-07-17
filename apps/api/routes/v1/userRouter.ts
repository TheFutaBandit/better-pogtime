import { Router } from "express";
import { signInController, signUpController } from "../../controllers/user";

const userRouter = Router();

userRouter.post("/sign-up", signUpController);

userRouter.post("/sign-in", signInController);

export default userRouter;