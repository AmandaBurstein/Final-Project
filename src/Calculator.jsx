import React, { Component } from "react";
import { connect } from "react-redux";
import Recipe from "./DisplayRecipe.jsx";
import MaterialInputs from "./MaterialInputs.jsx";
import { Link, Redirect } from "react-router-dom";

class UnconnectedCalculator extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      recipeVolume: "",
      glazeBase: "",
      recipe: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/all-recipes", { method: "GET" });
    let body = await response.text();
    let recipes = JSON.parse(body);
    console.log("recipes", recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
  };

  nameChangeHandler = event => {
    this.setState({ name: event.target.value });
  };

  recipeVolumeChangeHandler = event => {
    this.setState({ recipeVolume: event.target.value });
  };

  baseHandler = event => {
    this.setState({ glazeBase: event.target.value });
  };

  onSubmit = async () => {
    event.preventDefault();
    console.log("calculator submit clicked");
    let volume = "";
    if (this.props.volumeValue === "litres") {
      volume = this.state.recipeVolume * 1000;
    } else volume = this.state.recipeVolume;
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("materials", JSON.stringify(this.props.materials));
    data.append("recipeVolume", volume);
    let response = await fetch("/calculate", { method: "POST", body: data });
    let body = await response.text();
    let amounts = JSON.parse(body);
    console.log("checking amounts", amounts);
    this.setState({ recipe: amounts });
    console.log("this.state.recipe", this.state.recipe);
  };

  clearHandler = () => {
    console.log("clear button clicked");
    this.setState({
      name: "",
      glazeBase: "",
      recipeVolume: "",
      recipe: []
    });
    this.props.dispatch({ type: "clear-materials" });
    console.log("this.state.recipe", this.state.recipe);
  };

  addMaterial = () => {
    console.log("add material button clicked");
    this.props.dispatch({ type: "add-material" });
  };

  displayMaterialInput = (elem, index) => {
    return <MaterialInputs key={index} elem={elem} index={index} />;
  };

  addRecipe = async () => {
    event.preventDefault();
    let recipeRequest = prompt("Enter recipe name");
    let concentration = prompt("Enter recipe concentration");
    let data = new FormData();
    data.append("name", recipeRequest);
    data.append("concentration", concentration);
    let response = await fetch("/get-recipe", { method: "POST", body: data });
    let addRecipe = await response.text();
    addRecipe = JSON.parse(addRecipe);
    console.log("addRecipe", addRecipe);
    if (addRecipe.success === false) {
      window.alert("Recipe not found");
      return;
    }
    addRecipe.ingredients.forEach(recipe => {
      console.log("addRecipe.ingredients", addRecipe.ingredients);
      console.log("recipe in forEach", recipe);
      this.props.dispatch({
        type: "add-recipe-to-recipe",
        value: recipe
      });
    });
  };

  handleVolumeChange = event => {
    this.props.dispatch({
      type: "update-volume-value",
      value: event.target.value
    });
  };

  render = () => {
    if (this.props.loggedIn) {
      return (
        <div className="calculator-container">
          <div className="calculator-content">
            <div className="calculator-header">RECIPE CALCULATOR</div>
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Recipe name"
                  onChange={this.nameChangeHandler}
                  value={this.state.name}
                ></input>
              </div>
              <div>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Recipe volume"
                  onChange={this.recipeVolumeChangeHandler}
                  value={this.state.recipeVolume}
                ></input>
                <select
                  className="select-menu"
                  value={this.props.volumeValue}
                  onChange={this.handleVolumeChange}
                >
                  <option value="ml">ml</option>
                  <option value="litres">litres</option>
                </select>
              </div>
              <div>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Glaze base"
                  onChange={this.baseHandler}
                  value={this.state.glazeBase}
                ></input>
              </div>
              {this.props.materials.map(this.displayMaterialInput)}
              <div className="calculate-clear">
                <div>
                  <input
                    className="button"
                    type="submit"
                    value="CALCULATE"
                  ></input>
                </div>
                <button
                  className="button delete-button"
                  onClick={this.clearHandler}
                >
                  CLEAR
                </button>
              </div>
            </form>
            <button className="button" onClick={this.addMaterial}>
              ADD MATERIALS
            </button>
            <button className="button" onClick={this.addRecipe}>
              ADD RECIPE TO CALCULATOR
            </button>
            {this.state.recipe.length > 0 ? (
              <Recipe
                name={this.state.name}
                recipeVolume={this.state.recipeVolume}
                recipe={this.state.recipe}
                glazeBase={this.state.glazeBase}
              />
            ) : null}
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  };
}

let mapStateToProps = state => {
  return {
    materials: state.materials,
    volumeValue: state.volumeValue,
    loggedIn: state.loggedIn
  };
};
let Calculator = connect(mapStateToProps)(UnconnectedCalculator);

export default Calculator;
