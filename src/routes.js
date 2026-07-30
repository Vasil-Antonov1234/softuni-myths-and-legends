import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import mythController from "./controllers/mythController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/auth", authController);
routes.use("/myths", mythController);

routes.all("*url", (req, res) => {
    res.status(404).render("404");
});

export default routes;