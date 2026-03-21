import { useState } from "react";
import Home from "./pages/Home";
import Learn from "./pages/Learn";

function App() {
  const [selection, setSelection] = useState(null);

  return selection ? (
    <Learn selection={selection} />
  ) : (
    <Home onStart={setSelection} />
  );
}

export default App;