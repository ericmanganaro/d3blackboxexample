import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Sunburst from "./Sunburst";

function App() {
  return (
    <div className="App">
      <svg width="800" height="600">
        <Sunburst x={0} y={0} width={1500} height={1000} />
      </svg>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
