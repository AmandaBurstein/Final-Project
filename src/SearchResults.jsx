import React, { Component } from "react";

class SearchResults extends Component {
  render = () => {
    return (
      <div>
        <div>Recipe name: {recipe.recipeName}</div>
        {recipe.ingredients.map(ingredient => {
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
