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

mythController.get("/:mythId/details", async (req, res) => {
    const mythId = Number(req.params.mythId);
    const userId = Number(req.user?.id);

    try {
        const myth = await mythService.getById(mythId);

        if (!myth) {
            return res.status(404).render("404", { error: "Not found" });
        };

        const isOwner = myth.ownerId === userId;

        res.status(200).render("myths/details", { myth, isOwner })
    } catch (error) {
        const errorMessage = getErrorMessage(error);

        console.log(errorMessage)
        res.status(404).render("404", { error: errorMessage });
    };
});

mythController.get("/:mythId/delete", isAuthenticated, async (req, res) => {
    const mythId = Number(req.params.mythId);
    const userId = Number(req.user.id);

    try {
        const myth = await mythService.getById(mythId);

        if (myth.ownerId !== userId) {
            return res.status(401).render("404", { error: "Unauthorized" });
        };

        const deletedMyth = await mythService.deleteOne(mythId, userId);

        res.status(200).redirect("/myths/dashboard");
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(404).render("404", { error: errorMessage });
    };
});

mythController.get("/:mythId/edit", isAuthenticated, async (req, res) => {
    const userId = Number(req.user.id);
    const mythId = Number(req.params.mythId);

    try {
        const myth = await mythService.getById(mythId);

        if (myth.ownerId !== userId) {
            return res.status(401).render("404", { error: "Unauthorized"});
        };

        res.status(200).render("myths/edit", { myth });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("myths/edit", { error: errorMessage});
    };
});

mythController.post("/:mythId/edit", isAuthenticated, async (req, res) => {
    const userId = Number(req.user.id);
    const mythId = Number(req.params.mythId);
    const mythData = req.body;

    try {
        const myth = await mythService.getById(mythId);

        if(myth.ownerId !== userId) {
            return res.status(401).render("404", { error: "Unauthorized" });
        };

        const parsedData = await createMythSchema.parseAsync(mythData);

        const updatedMyth = mythService.updateOne(parsedData, mythId, userId);

        res.status(200).redirect(`/myths/${mythId}/details`)
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render("myths/edit", { error: errorMessage, myth: mythData });
    };
});

export default mythController;