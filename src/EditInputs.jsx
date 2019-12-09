import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedEditInputs extends Component {
  updateRecipeName = event => {
    this.props.dispatch({
      type: "edit-recipe-name",
      value: event.target.value
    });
  };

  updateGlazeBase = event => {
    this.props.dispatch({
      type: "edit-glaze-base",
      value: event.target.value
    });
  };

  updateColourTags = event => {
    this.props.dispatch({
      type: "edit-colour-tags",
      value: event.target.value
    });
  };

  updateMaterial = (event, index) => {
    this.props.dispatch({
      type: "edit-material",
      index: index,
      value: event.target.value
    });
  };

  updateConcentration = (event, index) => {
    this.props.dispatch({
      type: "edit-concentration",
      index: index,
      value: event.target.value
    });
  };

  updateNotes = (event, index) => {
    this.props.dispatch({
      type: "edit-notes",
      index: index,
      value: event.target.value
    });
  };

  render = () => {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.props.elem.recipeName}
            onChange={this.updateRecipeName}
            placeholder="Recipe name"
          ></input>
        </div>
        <div>
          <input
            type="text"
            value={this.props.elem.glazeBase}
            onChange={this.updateGlazeBase}
            placeholder="Glaze base"
          ></input>
        </div>
        <div>
          <input
            type="text"
            value={this.props.elem.colourTags}
            onChange={this.updateColourTags}
            placeholder="Colour families"
          ></input>
        </div>
        {this.props.elem.ingredients.map((ingredient, index) => {
          return (
            <div>
              <div>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={event => this.updateMaterial(event, index)}
                  placeholder="Material"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  value={ingredient.concentration}
                  onChange={event => this.updateConcentration(event, index)}
                  placeholder="Concentration"
                ></input>
              </div>
            </div>
          );
        })}
        {this.props.elem.notes.map(note => {
          return (
            <div>
              <input
                type="text"
                value={note}
                onChange={event => this.updateNotes(event, index)}
                placeholder="Notes"
              ></input>
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    editRecipe: state.editRecipe
  };
};

let EditInputs = connect(mapStateToProps)(UnconnectedEditInputs);

export default EditInputs;
