import React from "react";
import { gql, useQuery } from "@apollo/client";
import Movie from "components/Movie";
import { IMoviesData } from "interfaces";

const GET_MOVIE = gql`
  query {
    movies {
      id
      name
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery<IMoviesData>(GET_MOVIE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      {data?.movies
        ? data.movies.map((movie) => (
            <Movie key={movie.id} id={movie.id} name={movie.name} />
          ))
        : "No Movie..."}
    </div>
  );
}

export default Home;
