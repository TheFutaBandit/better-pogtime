import express from "express";

import v1Router from "./routes/v1/index.js";

import cors from "cors";

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1", v1Router);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port 3001`);
})