import {
  fetchUnits,
  fetchTopics,
  fetchMethod,
  fetchSteps,
  fetchExample,
} from "../services/stepService.js";

// ==========================
// CONTROLLERS
// ==========================

// GET /api/units
export const getUnits = (req, res) => {
  try {
    const data = fetchUnits();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch units" });
  }
};

// GET /api/topics/:unit
export const getTopics = (req, res) => {
  try {
    const { unit } = req.params;
    const data = fetchTopics(unit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

// GET /api/method?unit=1&topic=Eigenvalues
export const getMethod = (req, res) => {
  try {
    const { unit, topic } = req.query;
    const data = fetchMethod(unit, topic);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch method" });
  }
};

// GET /api/steps
export const getSteps = (req, res) => {
  try {
    const { unit, topic, method } = req.query;
    const data = fetchSteps(unit, topic, method);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch steps" });
  }
};

// GET /api/example
export const getExample = (req, res) => {
  try {
    const { stepIndex, unit, topic, method } = req.query;
    const data = fetchExample(stepIndex, unit, topic, method);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch example" });
  }
};