import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedMaterialInputs extends Component {
  updateMaterialInput = event => {
    this.props.dispatch({
      type: "update-material",
      index: this.props.index,
      value: event.target.value
    });
  };

  updateConcentrationInput = event => {
    this.props.dispatch({
      type: "update-concentration",
      index: this.props.index,
      value: event.target.value
    });
  };

  handleValueChange = event => {
    this.props.dispatch({
      type: "update-material-value",
      index: this.props.index,
      value: event.target.value
    });
  };

  render = () => {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.props.elem.name}
            onChange={this.updateMaterialInput}
            placeholder="Material"
          ></input>
          <select
            value={this.props.elem.materialValue}
            onChange={this.handleValueChange}
          >
            <option value="g">solid (g)</option>
            <option value="ml">liquid (ml)</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={this.props.elem.concentration}
            onChange={this.updateConcentrationInput}
            placeholder="Concentration"
          ></input>
          <select>
            <option value="percent">%</option>
          </select>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    materials: state.materials
  };
};

let MaterialInputs = connect(mapStateToProps)(UnconnectedMaterialInputs);

export default MaterialInputs;
