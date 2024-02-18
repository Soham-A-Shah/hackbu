import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import { jobRouter } from "./routes/Job.js";

import { getApplicationList, executeScrapping } from "./controllers/Job.js";

export const app = express();
app.use(express.json())

dotenv.config();
app.use(cors());

app.use("/api/v1/job/:id", jobRouter);
app.use("/api/v1/job/scrap", executeScrapping);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});
