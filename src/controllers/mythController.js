import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const mythController = Router();

mythController.get("/create", isAuthenticated, async (req, res) => {

    res.render("myths/create");
});

export default mythController;