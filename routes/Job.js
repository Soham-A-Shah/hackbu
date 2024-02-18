import express from "express";
import { getApplicationList, executeScrapping } from "../controllers/Job.js";

export const jobRouter = express.Router();

jobRouter.route("/").get(getApplicationList);
jobRouter.route("/scrap").get(executeScrapping);
