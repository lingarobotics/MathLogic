import fs from "fs";
import path from "path";

const filePath = path.resolve("data/m1_sample.json");

const rawData = fs.readFileSync(filePath);
const KB = JSON.parse(rawData);

// ==========================
// SERVICE FUNCTIONS
// ==========================

export const fetchUnits = () => KB.units;

export const fetchTopics = (unit) => {
  return KB.topics[unit] || [];
};

export const fetchMethod = (unit, topic) => {
  return KB.methods[topic] || [];
};

export const fetchSteps = (unit, topic, method) => {
  return KB.steps[method] || [];
};

export const fetchExample = (stepIndex, unit, topic, method) => {
  const methodExamples = KB.examples[method] || [];
  return {
    content: methodExamples[stepIndex] || "",
  };
};