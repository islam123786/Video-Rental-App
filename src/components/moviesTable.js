import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "like",
      content: (movie) => (
        <Like onLikeClicked={this.props.onLikeClicked} movie={movie} />
      ),
    },
    {
      path: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onDelete, onLikeClicked, sortColumn, onSort } = this.props;
    return (
      <Table
        movies={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
        onDelete={onDelete}
        onLikeClicked={onLikeClicked}
      />
    );
  }
}

export default MoviesTable;
