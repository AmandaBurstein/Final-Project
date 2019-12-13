import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import EditInputs from "./EditInputs.jsx";
import RecipeCard from "./RecipeCard.jsx";

class UnconnectedCatalogue extends Component {
  constructor() {
    super();
    this.state = {
      // notes: [],
      // file: undefined,
      showModal: false
    };
  }

  closeModal = event => {
    this.setState({ showModal: false });
  };

  submitRecipe = async event => {
    event.preventDefault();
    console.log(
      "this.props.editRecipe[0].recipeName",
      this.props.editRecipe[0].recipeName
    );
    let formData = new FormData();
    formData.append("recipeName", this.props.editRecipe[0].recipeName);
    formData.append("glazeBase", this.props.editRecipe[0].glazeBase);
    formData.append(
      "ingredients",
      JSON.stringify(this.props.editRecipe[0].ingredients)
    );
    formData.append("colourTags", this.props.editRecipe[0].colorTags);
    let reqResponse = await fetch("/update-recipe", {
      method: "POST",
      body: formData
    });
    let updatedRecipe = await reqResponse.text();
    updatedRecipe = JSON.parse(updatedRecipe);
    console.log("updatedRecipe", updatedRecipe);
    let responseBody = await fetch("/all-recipes", { method: "GET" });
    let recipes = await responseBody.text();
    recipes = JSON.parse(recipes);
    console.log("recipes", recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
    this.setState({ edit: false, showModal: false });
  };

  displayEditInput = element => {
    return <EditInputs elem={element} />;
  };

  render = () => {
    return (
      <div className="catalogue-container">
        <div className="catalogue-content">
          <div className="catalogue-header">RECIPE CATALOGUE</div>
          <Search />
          <div>
            {this.props.importedRecipes.map(recipe => {
              console.log("recipe", recipe);
              return <RecipeCard recipe={recipe} />;
            })}
          </div>
          <div
            className="mask"
            style={{ visibility: this.state.showModal ? "visible" : "hidden" }}
          />
          <div
            className="modal"
            style={{ visibility: this.state.showModal ? "visible" : "hidden" }}
          >
            <div>
              {this.state.showModal ? (
                <div>
                  <div className="modal-title">EDIT RECIPE</div>
                  <div>{this.props.editRecipe.map(this.displayEditInput)}</div>
                  <div>
                    <button
                      className="submit-edit-button"
                      onClick={this.submitRecipe}
                    >
                      SUBMIT EDITED RECIPE
                    </button>
                  </div>
                  <button className="close" onClick={this.closeModal}>
                    X
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    importedRecipes: state.importedRecipes,
    notes: state.notes,
    editRecipe: state.editRecipe
  };
};

let Catalogue = connect(mapStateToProps)(UnconnectedCatalogue);

export default Catalogue;
