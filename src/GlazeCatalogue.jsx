import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import EditInputs from "./EditInputs.jsx";

class UnconnectedCatalogue extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      file: "",
      edit: false,
      showModal: false
    };
  }

  closeModal = event => {
    this.setState({ showModal: false });
  };

  updateNotes = event => {
    this.setState({ notes: event.target.value });
  };

  photoHandler = event => {
    console.log("event.target.files[0]", event.target.files[0]);
    this.setState({ file: event.target.files[0] });
  };

  submitHandler = async recipeName => {
    try {
      event.preventDefault();
      console.log("Add note clicked");
      if (this.state.notes.length > 0) {
        let data = new FormData();
        console.log("recipeName", recipeName);
        data.append("recipeName", recipeName);
        data.append("notes", JSON.stringify(this.state.notes));
        let response = await fetch("/add-notes", {
          method: "POST",
          body: data
        });
        let notes = await response.text();
        notes = JSON.parse(notes);
        this.setState({ notes: [] });
        let responseBody = await fetch("/all-recipes", { method: "GET" });
        let recipes = await responseBody.text();
        recipes = JSON.parse(recipes);
        this.props.dispatch({ type: "import-recipes", value: recipes });
      }
    } catch (error) {
      window.alert("Unable to add notes");
    }
    if (this.state.file !== "") {
      let formData = new FormData();
      formData.append("image", this.state.file);
      formData.append("recipeName", recipeName);
      let reqResponse = await fetch("/add-photo", {
        method: "POST",
        body: formData
      });
      let body = await reqResponse.text();
      body = JSON.parse(body);
      console.log("photo response body", body);
      let response = await fetch("/all-recipes", { method: "GET" });
      let resBody = await response.text();
      resBody = JSON.parse(resBody);
      this.props.dispatch({ type: "import-recipes", value: resBody });
    }
  };

  deleteHandler = async recipeName => {
    event.preventDefault();
    console.log("delete recipe clicked");
    let verifyDelete = confirm(
      "Are you certain you want to delete this recipe?"
    );
    if (!verifyDelete) {
      return;
    }
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
  };

  editHandler = async recipeName => {
    event.preventDefault();
    console.log("editHandler clicked");
    this.setState({ edit: true, showModal: true });
    let name = recipeName;
    let data = new FormData();
    data.append("name", recipeName);
    let response = await fetch("/edit-recipe", {
      method: "POST",
      body: data
    });
    let editRecipe = await response.text();
    editRecipe = JSON.parse(editRecipe);
    console.log("recipe to edit", editRecipe);
    this.props.dispatch({ type: "edit-recipe", value: editRecipe });
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

  deleteNote = async recipeName => {
    event.preventDefault();
    console.log("Delete note clicked");
    let verifyDelete = confirm("Are you certain you want to delete this note?");
    if (!verifyDelete) {
      return;
    }
    let data = new FormData();
    data.append("name", recipeName);
    let response = await fetch("/delete-note", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ notes: [] });
    let responseBody = await fetch("/all-recipes", { method: "GET" });
    let recipes = await responseBody.text();
    recipes = JSON.parse(recipes);
    console.log("recipes", recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
  };

  deletePhoto = async recipeName => {
    event.preventDefault();
    console.log("delete photo clicked");
    let verifyDelete = confirm(
      "Are you certain you want to delete this image?"
    );
    if (!verifyDelete) {
      return;
    }
    let data = new FormData();
    data.append("name", recipeName);
    let response = await fetch("/delete-photo", { method: "POST", body: data });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ file: "" });
    let responseBody = await fetch("/all-recipes", { method: "GET" });
    let recipes = await responseBody.text();
    recipes = JSON.parse(recipes);
    console.log("recipes", recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
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
              return (
                <div className="recipe-container">
                  <button
                    className="button edit-button"
                    onClick={() => this.editHandler(recipe.recipeName)}
                  >
                    EDIT RECIPE
                  </button>
                  <div className="catalogue-recipe-line">
                    <div className="catalogue-recipe-titles">NAME </div>
                    <div className="catalogue-recipe-info">
                      <ul className="list-items">
                        <li>{recipe.recipeName}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="catalogue-recipe-line">
                    <div className="catalogue-recipe-titles">GLAZE BASE </div>
                    <div className="catalogue-recipe-info">
                      <ul className="list-items">
                        <li> {recipe.glazeBase}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="catalogue-recipe-line">
                    <div className="catalogue-recipe-titles">MATERIALS</div>
                    <div className="catalogue-recipe-info">
                      {recipe.ingredients.map(ingredient => {
                        return (
                          <div>
                            <ul className="list-items">
                              <li>
                                {ingredient.name} {ingredient.concentration}%
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    {recipe.notes ? (
                      <div className="catalogue-recipe-titles">NOTES</div>
                    ) : null}
                    {recipe.notes
                      ? recipe.notes.map(note => {
                          return (
                            <div>
                              <ul className="list-items">
                                <li>{note}</li>
                              </ul>
                            </div>
                          );
                        })
                      : null}
                  </div>
                  <div>
                    {recipe.frontendPath
                      ? recipe.frontendPath.map(path => {
                          return <img className="images" src={path}></img>;
                        })
                      : null}
                  </div>
                  <form onSubmit={() => this.submitHandler(recipe.recipeName)}>
                    <div className="add-notes-photo">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Add notes..."
                        onChange={this.updateNotes}
                        value={this.state.notes}
                      />
                      <label className="file-button" for="file">
                        ADD PHOTO
                      </label>
                      <input
                        id="file"
                        type="file"
                        ref={this.fileInputRef}
                        onChange={this.photoHandler}
                      />
                    </div>
                    <input className="button" type="submit" value="SUBMIT" />
                  </form>
                  <button
                    className="button delete-button"
                    onClick={() => this.deleteNote(recipe.recipeName)}
                  >
                    DELETE NOTE
                  </button>
                  <button
                    className="button delete-button"
                    onClick={() => this.deletePhoto(recipe.recipeName)}
                  >
                    DELETE PHOTO
                  </button>
                  <button
                    className="button delete-button"
                    onClick={() => this.deleteHandler(recipe.recipeName)}
                  >
                    DELETE RECIPE
                  </button>
                </div>
              );
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
