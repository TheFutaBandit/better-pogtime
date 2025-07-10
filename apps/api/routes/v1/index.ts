import { Router } from "express";
import websiteRouter from "./wesbiteRouter";

const v1Router = Router();

v1Router.use("/website", websiteRouter);

export default v1Router;