import { useEffect, useState } from "react";
import { getUnits, getTopics } from "../services/api";

function MethodSelector({ onSelectionComplete }) {
  const [units, setUnits] = useState([]);
  const [topics, setTopics] = useState([]);

  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    getUnits().then(setUnits);
  }, []);

  const handleUnitChange = async (unit) => {
    setSelectedUnit(unit);
    const data = await getTopics(unit);
    setTopics(data);
  };

  return (
    <div className="selector-container">
      <h2>Select Learning Path</h2>

      <select
        className="dropdown"
        onChange={(e) => handleUnitChange(e.target.value)}
      >
        <option value="">Select Unit</option>
        {units.map((u) => (
          <option key={u} value={u}>
            Unit {u}
          </option>
        ))}
      </select>

      <select
        className="dropdown"
        disabled={!selectedUnit}
        onChange={(e) =>
          onSelectionComplete(selectedUnit, e.target.value)
        }
      >
        <option value="">Select Topic</option>
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MethodSelector;