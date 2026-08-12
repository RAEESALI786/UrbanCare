import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import servicesRouter from "./routes/services.js";
import bookingsRouter from "./routes/bookings.js";
import assistantRouter from "./routes/assistant.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/assistant", assistantRouter);

app.use((req, res) => res.status(404).json({ message: "Not found." }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
