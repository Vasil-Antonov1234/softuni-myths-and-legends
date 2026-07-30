import { Router } from "express";
import mythService from "../services/mythService.js";

const apiController = Router();

apiController.get("/report/myths/latest", async (req, res) => {

    const report = await mythService.report();

    res.status(200).json(report);
})

export default apiController;