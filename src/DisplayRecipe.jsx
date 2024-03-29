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
    let colourTags = prompt("Enter colour families");
    let data = new FormData();
    data.append("username", this.props.loggedIn.username);
    data.append("name", this.props.name);
    data.append("glazeBase", this.props.glazeBase);
    data.append("materials", JSON.stringify(this.props.materials));
    data.append("recipeVolume", this.props.recipeVolume);
    data.append("colourTags", colourTags);
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
      <div className="recipe-container">
        <div className="calculated-recipe">
          <div>
            <div className="catalogue-recipe-titles">NAME</div>
            <div className="catalogue-recipe-info">{this.props.name}</div>
          </div>
          <div>
            <div>
              <div className="catalogue-recipe-titles">VOLUME</div>
              <div className="catalogue-recipe-info">
                {this.props.recipeVolume} {this.props.volumeValue}
              </div>
            </div>
          </div>
          <div>
            <div className="catalogue-recipe-titles">RECIPE</div>
            <div className="catalogue-recipe-info">
              {this.props.glazeBase} {this.props.recipeVolume}{" "}
              {this.props.volumeValue}
            </div>
          </div>
          {this.props.recipe.map(material => {
            return (
              <div className="catalogue-recipe-info">
                {material.name} {material.amount} {material.materialValue}
              </div>
            );
          })}
          <button
            className="button edit-button"
            onClick={this.addRecipeHandler}
          >
            ADD RECIPE TO CATALOGUE
          </button>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    materials: state.materials,
    volumeValue: state.volumeValue,
    importedRecipes: state.importedRecipes,
    loggedIn: state.loggedIn
  };
};

let Recipe = connect(mapStateToProps)(UnconnectedRecipe);

export default Recipe;
