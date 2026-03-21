const BASE_URL = "http://localhost:5000/api";

const handleResponse = async (res) => {
  if (!res.ok) throw new Error("API error");
  return res.json();
};

export const getUnits = async () => {
  const res = await fetch(`${BASE_URL}/units`);
  return handleResponse(res);
};

export const getTopics = async (unit) => {
  const res = await fetch(`${BASE_URL}/topics/${unit}`);
  return handleResponse(res);
};

export const getMethods = async (unit, topic) => {
  const res = await fetch(
    `${BASE_URL}/method?unit=${unit}&topic=${encodeURIComponent(topic)}`
  );
  return handleResponse(res);
};

export const getSteps = async (unit, topic, method) => {
  const res = await fetch(
    `${BASE_URL}/steps?unit=${unit}&topic=${encodeURIComponent(
      topic
    )}&method=${encodeURIComponent(method)}`
  );
  return handleResponse(res);
};

export const getExample = async (stepIndex, unit, topic, method) => {
  const res = await fetch(
    `${BASE_URL}/example?stepIndex=${stepIndex}&unit=${unit}&topic=${encodeURIComponent(
      topic
    )}&method=${encodeURIComponent(method)}`
  );
  return handleResponse(res);
};