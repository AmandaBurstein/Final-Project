import React, { Component } from "react";
import { connect } from "react-redux";
import SearchResults from "./SearchResults.jsx";

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
    this.setState({ query: "", searchResults: [] });
  };

  handleSearchQuery = event => {
    let query = event.target.value;
    this.setState({ query: query, delete: false });
  };

  handleSubmit = () => {
    event.preventDefault();
    let searchResults = this.props.importedRecipes.filter(recipe => {
      return recipe.colourTags.includes(this.state.query);
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
              placeholder="Search by colour family..."
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
