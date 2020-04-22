import React from "react";

const ListGroup = ({ genres, onGenreSelected, selectedGenre }) => {
  return (
    <ul className="list-group">
      <li
        style={{ cursor: "pointer" }}
        onClick={() => onGenreSelected()}
        className={
          !selectedGenre ? "list-group-item active" : "list-group-item"
        }
      >
        All Genres
      </li>
      {genres.map((genre) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onGenreSelected(genre)}
          key={genre._id}
          className={
            selectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
