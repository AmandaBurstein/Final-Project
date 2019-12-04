import React, { Component } from "react";

class UnconnectedSearch extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      searchResults: []
    };
  }

  handleDelete = event => {
    let query = event.target.value;
    this.setState({ query: "" });
  };

  handleSearchQuery = event => {
    let query = event.target.value;
    this.setState({ query: query });
  };

  handleSubmit = async () => {
    event.preventDefault();
    let searchResults = importedRecipes.filter(recipe => {
      return recipe.colours === "this.state.query";
    });
    this.setState({ searchResults: searchResults });
  };

  render = () => {
    return (
      <div>
        <div>
          <div>
            <input
              type="text"
              value={this.state.query}
              placeholder="Search..."
              onChange={this.handleSearchQuery}
            />
            <button onClick={this.handleSubmit}>Search</button>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
          {this.state.searchResults.map(recipe => {
            return <SearchResults recipe={recipe} />;
          })}
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

let Search = connect(mapStateToProps)(UnconnectedSearch);

export default Search;
