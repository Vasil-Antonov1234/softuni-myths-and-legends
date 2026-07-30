import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtil.js";
import mythService from "../services/mythService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    
    try {
        const latestMyths = await mythService.getLatest();
    
        res.render("home", { latestMyths });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render("/", { error: errorMessage });    
    };

});

export default homeController;