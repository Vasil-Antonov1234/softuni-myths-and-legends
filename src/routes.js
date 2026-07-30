import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import mythController from "./controllers/mythController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/auth", authController);
routes.use("/myths", mythController);

export default routes;