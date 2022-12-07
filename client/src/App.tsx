import React, { useState } from "react";
import Button from "./components/Button/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <Button
        onClick={handleClick}
        type="PRIMARY"
        size={"BG"}
        rounded={"CIRCLE"}
      >
        Click
      </Button>
      <h4 className="text-cyan-500">{count}</h4>
    </div>
  );
}

export default App;
