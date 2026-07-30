import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createMythSchema } from "../schemas/mythSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import mythService from "../services/mythService.js";

const mythController = Router();

mythController.get("/create", isAuthenticated, async (req, res) => {
    
    res.status(200).render("myths/create");
});

mythController.post("/create", isAuthenticated, async (req, res) => {
    const mythData = req.body;
    const ownerId = Number(req.user.id);

    try {
        const parsedData = await createMythSchema.parseAsync(mythData);

        const myth = await mythService.create(parsedData, ownerId);

        res.status(201).redirect("/");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("myths/create", { error: errorMessage, mythData })
    };
});

mythController.get("/dashboard", async (req, res) => {
    
    try {
        const myths = await mythService.getAll()
    
        res.render("myths/dashboard", { myths });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(404).render("myths/404", { error: errorMessage });
    };
    
});

export default mythController;