import { useState } from "react";
import MethodSelector from "../components/MethodSelector";

function Home({ onStart }) {
  const [selection, setSelection] = useState(null);

  const handleSelection = (unit, topic) => {
    setSelection({ unit, topic });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">LGC MathLogic</h1>

      <MethodSelector onSelectionComplete={handleSelection} />

      {selection && (
        <button
          className="start-btn"
          onClick={() => onStart(selection)}
        >
          Start Learning
        </button>
      )}
    </div>
  );
}

export default Home;