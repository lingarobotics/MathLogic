function StepViewer({ step, onNext, hasNext }) {
  return (
    <div className="step-container">
      <h3>Step</h3>
      <p className="step-text">{step}</p>

      <button className="next-btn" onClick={onNext} disabled={!hasNext}>
        Next Step
      </button>
    </div>
  );
}

export default StepViewer;