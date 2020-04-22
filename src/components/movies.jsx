import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import { getGenres } from "../fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });

    let allMovies = getMovies();
    if (genre) {
      const movies = allMovies.filter((m) => m.genre._id === genre._id);
      this.setState({ movies });
      return;
    }

    //when All Genre is selected.
    this.setState({ movies: allMovies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleNewMovie = () => {
    this.props.history.push("/movies/new");
  };

  handleSearch = (query) => {
    const searchQuery = query;
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });

    if (searchQuery) {
      let allMovies = getMovies();
      const movies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      this.setState({ movies });
    }
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { length: count } = allMovies;

    //Commented below code as
    // if (count === 0) return <p>There are no movies in the database.</p>;

    const sortedMovies = _.orderBy(
      allMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={genres}
            onGenreSelected={this.handleGenreSelected}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            style={{ marginBottom: 20 }}
            className="btn btn-primary"
            to="/movies/new"
          >
            New Movie
          </Link>
          <p>Showing {count} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLikeClicked={this.handleLikeClick}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            totalItems={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
