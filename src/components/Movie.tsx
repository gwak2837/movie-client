import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "interfaces";

function Movie({ id, name }: IMovie) {
  return (
    <div>
      {" "}
      <Link to={`/movie/${id}`}>{name}</Link>
    </div>
  );
}

export default Movie;
