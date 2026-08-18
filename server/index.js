import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import servicesRouter from "./routes/services.js";
import bookingsRouter from "./routes/bookings.js";
import assistantRouter from "./routes/assistant.js";
import professionalsRouter from "./routes/professionals.js";

const app = express();

// Two separate frontends (the customer site and the professional portal)
// need to reach this one backend, so CORS must allow both origins.
// Set CLIENT_URL and PRO_CLIENT_URL in .env, comma-separating extra origins
// in either if needed. Falls back to allowing everything if neither is set
// (fine for local dev, not recommended in production).
const allowedOrigins = [process.env.CLIENT_URL, process.env.PRO_CLIENT_URL]
  .filter(Boolean)
  .flatMap((v) => v.split(",").map((o) => o.trim()));

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : "*",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/assistant", assistantRouter);
app.use("/api/professionals", professionalsRouter);

app.use((req, res) => res.status(404).json({ message: "Not found." }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
