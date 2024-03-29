import { createStore } from "redux";
import * as R from "ramda";

let initialState = {
  materials: [{ name: "", concentration: "", materialValue: "g" }],
  volumeValue: "ml",
  importedRecipes: [],
  loggedIn: false,
  editRecipe: []
};

let reducer = (state, action) => {
  if (action.type === "add-material") {
    return {
      ...state,
      materials: state.materials.concat({
        name: "",
        concentration: "",
        materialValue: "g"
      })
    };
  }
  if (action.type === "update-material") {
    let newState = R.clone(state);
    newState.materials[action.index].name = action.value;
    return newState;
  }
  if (action.type === "update-concentration") {
    let newState = R.clone(state);
    newState.materials[action.index].concentration = action.value;
    return newState;
  }
  if (action.type === "clear-materials") {
    return { ...state, materials: [] };
  }
  if (action.type === "add-recipe-to-recipe") {
    return { ...state, materials: [...state.materials, action.value] };
  }
  if (action.type === "update-material-value") {
    let newState = R.clone(state);
    newState.materials[action.index].materialValue = action.value;
    return newState;
  }
  if (action.type === "update-volume-value") {
    return { ...state, volumeValue: action.value };
  }
  if (action.type === "import-recipes") {
    return {
      ...state,
      importedRecipes: action.value
    };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "edit-recipe") {
    return { ...state, editRecipe: [action.value] };
  }
  if (action.type === "edit-recipe-name") {
    let newState = R.clone(state);
    newState.editRecipe[0].recipeName = action.value;
    return newState;
  }
  if (action.type === "edit-glaze-base") {
    let newState = R.clone(state);
    newState.editRecipe[0].glazeBase = action.value;
    return newState;
  }
  if (action.type === "edit-colour-tags") {
    let newState = R.clone(state);
    newState.editRecipe[0].colourTags = action.value;

    return newState;
  }
  if (action.type === "edit-material") {
    let newState = R.clone(state);
    newState.editRecipe[0].ingredients[action.index].name = action.value;
    return newState;
  }
  if (action.type === "edit-concentration") {
    let newState = R.clone(state);
    newState.editRecipe[0].ingredients[action.index].concentration =
      action.value;
    return newState;
  }
  if (action.type === "edit-notes") {
    let newState = R.clone(state);
    newState.editRecipe[0].notes[action.index] = action.value;
    return newState;
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false };
  }
  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
