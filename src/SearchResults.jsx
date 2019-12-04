import React, { Component } from "react";

class SearchResults extends Component {
  render = () => {
    return (
      <div>
        <div>Recipe name: {this.props.recipe.recipeName}</div>
        {this.props.recipe.ingredients.map(ingredient => {
          return (
            <div>
              {ingredient.name} {ingredient.concentration}%
            </div>
          );
        })}
      </div>
    );
  };
}

export default SearchResults;
