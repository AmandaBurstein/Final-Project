import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import RecipeCard from "./RecipeCard.jsx";

class UnconnectedCatalogue extends Component {
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
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    importedRecipes: state.importedRecipes
  };
};

let Catalogue = connect(mapStateToProps)(UnconnectedCatalogue);

export default Catalogue;
