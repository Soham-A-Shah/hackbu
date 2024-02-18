import express from "express";
import {getApplicationList} from '../controllers/Job.js'

export const jobRouter = express.Router()

jobRouter.route("/").get(getApplicationList)
