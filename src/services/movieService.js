import http from "./httpService";

function getMovieUrl(id) {
  return "/movies/" + id;
}

export function getMovies() {
  return http.get("/movies");
}

export function getMovie(movieId) {
  return http.get(getMovieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post("/movies", movie);
}

export function deleteMovie(movieId) {
  return http.delete(getMovieUrl(movieId));
}
