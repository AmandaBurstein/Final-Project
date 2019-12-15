import React, { Component } from "react";
import { connect } from "react-redux";
import EditInputs from "./EditInputs.jsx";

class UnconnectedRecipeCard extends Component {
  constructor() {
    super();
    this.state = {
      notes: "",
      file: undefined,
      showModal: false
    };
  }

  photoHandler = event => {
    console.log("event.target.files[0]", event.target.files[0]);
    this.setState({ file: event.target.files[0] });
  };

  closeModal = event => {
    this.setState({ showModal: false });
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
    if (this.state.file !== undefined) {
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
      this.setState({ file: undefined });
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
    this.setState({ file: undefined });
    let responseBody = await fetch("/all-recipes", { method: "GET" });
    let recipes = await responseBody.text();
    recipes = JSON.parse(recipes);
    console.log("recipes", recipes);
    this.props.dispatch({ type: "import-recipes", value: recipes });
  };

  updateNotes = event => {
    this.setState({ notes: event.target.value });
  };

  editHandler = async () => {
    event.preventDefault();
    console.log("editHandler clicked");
    this.setState({ showModal: true });
    let name = this.props.recipe.recipeName;
    let data = new FormData();
    data.append("name", name);
    let response = await fetch("/edit-recipe", {
      method: "POST",
      body: data
    });
    let editRecipe = await response.text();
    editRecipe = JSON.parse(editRecipe);
    console.log("recipe to edit", editRecipe);
    this.props.dispatch({ type: "edit-recipe", value: editRecipe });
  };

  displayEditInput = element => {
    return <EditInputs elem={element} />;
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
    this.setState({ showModal: false });
  };

  render = () => {
    let fileUploadFeedback = undefined;
    if (this.state.file !== undefined) {
      fileUploadFeedback = " photo selected";
    }
    return (
      <div>
        <div className="recipe-container">
          <button
            className="button edit-button"
            onClick={() => this.editHandler(this.props.recipe.recipeName)}
          >
            EDIT RECIPE
          </button>
          <div className="catalogue-recipe-line">
            <div className="catalogue-recipe-titles">NAME </div>
            <div className="catalogue-recipe-info">
              <ul className="list-items">
                <li>{this.props.recipe.recipeName}</li>
              </ul>
            </div>
          </div>
          <div className="catalogue-recipe-line">
            <div className="catalogue-recipe-titles">GLAZE BASE </div>
            <div className="catalogue-recipe-info">
              <ul className="list-items">
                <li> {this.props.recipe.glazeBase}</li>
              </ul>
            </div>
          </div>
          <div className="catalogue-recipe-line">
            <div className="catalogue-recipe-titles">MATERIALS</div>
            <div className="catalogue-recipe-info">
              {this.props.recipe.ingredients.map(ingredient => {
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
            {this.props.recipe.notes ? (
              <div className="catalogue-recipe-titles">NOTES</div>
            ) : null}
            {this.props.recipe.notes
              ? this.props.recipe.notes.map(note => {
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
            {this.props.recipe.frontendPath
              ? this.props.recipe.frontendPath.map(path => {
                  return <img className="images" src={path}></img>;
                })
              : null}
          </div>
          <form
            onSubmit={() => this.submitHandler(this.props.recipe.recipeName)}
          >
            <div className="add-notes-photo">
              <input
                className="note-form-input"
                type="text"
                placeholder="Add notes..."
                onChange={this.updateNotes}
                value={this.state.notes}
              />
              <div className="file-input">
                <input type="file" onChange={this.photoHandler} />
                <span className="add-photo-button">ADD PHOTO</span>
              </div>
              <div className="upload-success">{fileUploadFeedback}</div>
            </div>
            <input className="button" type="submit" value="SUBMIT" />
          </form>
          <button
            className="button delete-button"
            onClick={() => this.deleteNote(this.props.recipe.recipeName)}
          >
            DELETE NOTE
          </button>
          <button
            className="button delete-button"
            onClick={() => this.deletePhoto(this.props.recipe.recipeName)}
          >
            DELETE PHOTO
          </button>
          <button
            className="button delete-button"
            onClick={() => this.deleteHandler(this.props.recipe.recipeName)}
          >
            DELETE RECIPE
          </button>
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

let RecipeCard = connect(mapStateToProps)(UnconnectedRecipeCard);

export default RecipeCard;
