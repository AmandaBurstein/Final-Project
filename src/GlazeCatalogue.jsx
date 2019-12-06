import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";

class UnconnectedCatalogue extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  //edit recipe will need to display the same inputs as Calculator and
  //populate them with existing data using the prop defaultValue={}

  updateNotes = event => {
    this.setState({ notes: event.target.value });
  };

  noteHandler = async recipeName => {
    try {
      event.preventDefault();
      console.log("Add note clicked");
      let data = new FormData();
      console.log("recipeName", recipeName);
      data.append("recipeName", recipeName);
      data.append("notes", JSON.stringify(this.state.notes));
      let response = await fetch("/add-notes", { method: "POST", body: data });
      let notes = await response.text();
      notes = JSON.parse(notes);
      window.alert("Notes successfully added");
      this.setState({ notes: [] });
      let responseBody = await fetch("/all-recipes", { method: "GET" });
      let recipes = await responseBody.text();
      recipes = JSON.parse(recipes);
      this.props.dispatch({ type: "import-recipes", value: recipes });
    } catch (error) {
      window.alert("Unable to add notes");
    }
  };

  // editHandler = async () => {
  //   console.log("edit recipe clicked");
  //   let data = new FormData();
  //   data.append();
  //   data.append();
  //   let response = await fetch("/", { method: "POST", body: data });
  //   let editRecipe = await response.text();
  //   editRecipe = JSON.parse(editRecipe);
  //   if (!body.success) {
  //     window.alert("Unable to edit recipe");
  //   }
  //   window.alert("Recipe successfully edited");
  // };

  deleteHandler = async recipeName => {
    event.preventDefault();
    console.log("delete recipe clicked");
    let data = new FormData();
    data.append("name", recipeName);
    let response = await fetch("/delete-recipe", {
      method: "POST",
      body: data
    });
    let deleteRecipe = await response.text();
    deleteRecipe = JSON.parse(deleteRecipe);
    if (!deleteRecipe.success) {
      window.alert("Unable to delete recipe");
    }
    let responseBody = await fetch("/all-recipes", { method: "GET" });
    let recipes = await responseBody.text();
    recipes = JSON.parse(recipes);
    console.log("recipes", recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
    window.alert("Recipe deleted from catalogue");
  };

  render = () => {
    return (
      <div>
        <h3>Catalogue</h3>
        <Search />
        <div>
          {this.props.importedRecipes.map(recipe => {
            return (
              <div>
                <h4>Name: {recipe.recipeName}</h4>
                <div>Glaze base: {recipe.glazeBase}</div>
                <div>
                  Materials:
                  {recipe.ingredients.map(ingredient => {
                    return (
                      <div>
                        <div>
                          {ingredient.name} {ingredient.concentration}%
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  {recipe.notes
                    ? recipe.notes.map(note => {
                        return (
                          <ul>
                            <li>{note}</li>
                          </ul>
                        );
                      })
                    : null}
                </div>
                <form onSubmit={() => this.noteHandler(recipe.recipeName)}>
                  <input
                    type="text"
                    placeholder="Add notes..."
                    onChange={this.updateNotes}
                  />
                  <input type="submit" value="Add notes" />
                </form>
                {/* <button onClick={this.editHandler}>Edit recipe</button> */}
                <button onClick={() => this.deleteHandler(recipe.recipeName)}>
                  Delete recipe
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { importedRecipes: state.importedRecipes, notes: state.notes };
};

let Catalogue = connect(mapStateToProps)(UnconnectedCatalogue);

export default Catalogue;
