import express from "express";
import {
  getUnits,
  getTopics,
  getMethod,
  getSteps,
  getExample,
} from "../controllers/learningController.js";

const router = express.Router();

// ==========================
// ROUTES (API ENDPOINTS)
// ==========================

// Get all units
router.get("/units", getUnits);

// Get topics based on unit
router.get("/topics/:unit", getTopics);

// Get methods based on unit + topic
router.get("/method", getMethod);

// Get steps based on method
router.get("/steps", getSteps);

// Get example for a step
router.get("/example", getExample);

export default router;