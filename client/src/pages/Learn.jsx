import { useState } from "react";
import StepViewer from "../components/StepViewer";
import ExampleViewer from "../components/ExampleViewer";
import { getSteps, getExample, getMethods } from "../services/api";

function Learn({ selection }) {
  const { unit, topic } = selection;

  const [method, setMethod] = useState(null);
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);
  const [example, setExample] = useState(null);

  const startLearning = async () => {
    const methods = await getMethods(unit, topic);
    const m = methods[0];
    setMethod(m);

    const stepsData = await getSteps(unit, topic, m);
    setSteps(stepsData);
    setIndex(0);
  };

  const nextStep = () => {
    setIndex((prev) => prev + 1);
    setExample(null);
  };

  const showExample = async () => {
    const data = await getExample(index, unit, topic, method);
    setExample(data);
  };

  return (
    <div className="app-container">
      <h2>{topic}</h2>

      {steps.length === 0 ? (
        <button className="start-btn" onClick={startLearning}>
          Begin Steps
        </button>
      ) : (
        <>
          <StepViewer
            step={steps[index]}
            onNext={nextStep}
            hasNext={index < steps.length - 1}
          />

          <button className="example-btn" onClick={showExample}>
            Show Example
          </button>

          <ExampleViewer example={example} />
        </>
      )}
    </div>
  );
}

export default Learn;