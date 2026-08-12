import { Router } from "express";
import Service from "../models/Service.js";

const router = Router();

router.get("/", async (req, res) => {
  const services = await Service.find().sort({ slug: 1 });
  res.json(services);
});

router.get("/:slug", async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) return res.status(404).json({ message: "Service not found." });
  res.json(service);
});

export default router;
