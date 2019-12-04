import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCatalogue extends Component {
  render = () => {
    return (
      <div>
        <h3>Catalogue</h3>
        <div>
          {this.props.importedRecipes.map(recipe => {
            return (
              <div>
                <h4>{recipe.recipeName}</h4>
                <div>
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
              </div>
            );
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
