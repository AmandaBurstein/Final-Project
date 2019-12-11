import React, { Component } from "react";

class SearchResults extends Component {
  render = () => {
    return (
      <div className="search-result-container">
        <div className="catalogue-recipe-titles">NAME</div>
        <div className="catalogue-recipe-info">
          {this.props.recipe.recipeName}
        </div>
        <div>
          <div className="catalogue-recipe-titles">MATERIALS</div>
          {this.props.recipe.ingredients.map(ingredient => {
            return (
              <div className="catalogue-recipe-info">
                {ingredient.name} {ingredient.concentration}%
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default SearchResults;
