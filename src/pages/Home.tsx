import React from "react";
import { gql, useQuery } from "@apollo/client";
import Movie from "components/Movie";
import { IMoviesData } from "interfaces";
import Error from "components/Error";
import Loading from "components/Loading";

const GET_MOVIE = gql`
  query {
    movies {
      id
      name
    }
  }
`;

function Home() {
  const moviesResult = useQuery<IMoviesData>(GET_MOVIE);

  const moviesData = moviesResult.data?.movies;
  const movies = moviesData?.length !== 0 ? moviesData : undefined;

  if (moviesResult.loading) return <Loading />;
  if (moviesResult.error) return <Error msg={moviesResult.error.message} />;

  return (
    <div>
      {movies?.map((movie) => (
        <Movie key={movie.id} id={movie.id} name={movie.name} />
      )) ?? "No movie..."}
    </div>
  );
}

export default Home;
