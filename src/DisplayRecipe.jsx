import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedRecipe extends Component {
  addRecipeHandler = async () => {
    event.preventDefault();
    console.log("add recipe clicked");
    if (
      this.props.importedRecipes.find(
        recipe => recipe.recipeName === this.props.name
      ) !== undefined
    ) {
      window.alert("Recipe name already exists. Please enter a unique name");
      return;
    }
    let data = new FormData();
    data.append("name", this.props.name);
    data.append("materials", JSON.stringify(this.props.materials));
    data.append("recipeVolume", this.props.recipeVolume);
    let response = await fetch("/add-recipe", { method: "POST", body: data });
    let recipe = await response.text();
    recipe = JSON.parse(recipe);
    window.alert("Recipe submitted");
    let responseBody = await fetch("/all-recipes", { method: "GET" });
    let recipes = await responseBody.text();
    recipes = JSON.parse(recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
  };

  render = () => {
    return (
      <div>
        <div>Name: {this.props.name}</div>
        <div>
          Recipe volume: {this.props.recipeVolume} {this.props.volumeValue}
        </div>
        {this.props.recipe.map(material => {
          return (
            <div>
              <div>{material.name}</div>
              <div>
                {material.amount} {material.materialValue}
              </div>
            </div>
          );
        })}
        <button onClick={this.addRecipeHandler}>Add Recipe to Catalogue</button>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    materials: state.materials,
    volumeValue: state.volumeValue,
    importedRecipes: state.importedRecipes
  };
};

let Recipe = connect(mapStateToProps)(UnconnectedRecipe);

export default Recipe;
