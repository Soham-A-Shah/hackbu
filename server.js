import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import { jobRouter } from "./routes/Job.js";

export const app = express();

dotenv.config();


app.use("/api/v1/job/:id", jobRouter);

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});
