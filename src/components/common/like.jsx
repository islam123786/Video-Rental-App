import React from "react";

const Like = ({ movie, onLikeClicked }) => {
  let classes = "fa fa-heart";
  if (!movie.liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={() => onLikeClicked(movie)}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
