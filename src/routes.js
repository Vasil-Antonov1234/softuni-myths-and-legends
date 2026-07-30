import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import mythController from "./controllers/mythController.js";
import apiController from "./controllers/apiController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/auth", authController);
routes.use("/myths", mythController);
routes.use("/api", apiController);

routes.all("*url", (req, res) => {
    res.status(404).render("404");
});

export default routes;