import express from "express";
import dotenv from "dotenv";

import { connectDatabase } from "./config/database.js";
import { jobRouter } from "./routes/Job.js";

export const app = express();

dotenv.config();

connectDatabase();

app.use("/api/v1/job", jobRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});
