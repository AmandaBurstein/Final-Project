import { createStore } from "redux";
import * as R from "ramda";

let initialState = {
  materials: [{ name: "", concentration: "", materialValue: "g" }],
  volumeValue: "ml",
  importedRecipes: [],
  loggedIn: { username: "", loggedIn: true }
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
      importedRecipes: state.importedRecipes.concat(action.value)
    };
  }
  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
