import express from "express";
import cors from "cors";
import learningRoutes from "./routes/learningRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", learningRoutes);

export default app;