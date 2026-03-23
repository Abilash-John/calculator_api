import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Calculator API! Use /api/auth or /api/calculations" });
});

import authRoutes from "./routes/auth.routes";
import calculationRoutes from "./routes/calculation.routes";
import userRoutes from "./routes/user.routes";

app.use("/api/auth", authRoutes);
app.use("/api/calculations", calculationRoutes);
app.use("/api/users", userRoutes);

// Initialize Database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}, http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
