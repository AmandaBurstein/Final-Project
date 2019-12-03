import React, { Component } from "react";
import Calculator from "./Calculator.jsx";

class App extends Component {
  render = () => {
    return (
      <div>
        <div>Glaze Calculator</div>
        <Calculator />
      </div>
    );
  };
}

export default App;
