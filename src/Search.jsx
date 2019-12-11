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
      <div className="search-container">
        <div>
          <div>
            <input
              className="search-form-input"
              type="text"
              value={this.state.query}
              placeholder="Search by colour..."
              onChange={this.handleSearchQuery}
            />
            <button className="button" onClick={this.handleSubmit}>
              SEARCH
            </button>
            <button className="button" onClick={this.handleDelete}>
              CLEAR
            </button>
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
