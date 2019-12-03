import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCatalogue extends Component {
  render = () => {
    console.log("this.props.importedRecipes", this.props.importedRecipes);
    return (
      <div>
        Catalogue
        <div>
          {this.props.importedRecipes.map(recipe => {
            return <div>{recipe.recipeName}</div>;
          })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { importedRecipes: state.importedRecipes };
};

let Catalogue = connect(mapStateToProps)(UnconnectedCatalogue);

export default Catalogue;
