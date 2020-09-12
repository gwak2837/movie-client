import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { IMovieData, IMovieVars } from "interfaces";
import Error from "components/Error";
import Loading from "components/Loading";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      name
      rating
    }
  }
`;

function Detail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<IMovieData, IMovieVars>(GET_MOVIE, {
    variables: { id: Number(id) },
  });

  if (loading) return <Loading />;
  if (error) return <Error msg={error.message} />;

  // 서버로부터 받은 데이터가 있으면 영화 정보를 반환하고
  // 없으면 'No Detail...' 반환
  return (
    <div>
      {data?.movie ? (
        <>
          <div>Name : {data.movie.name}</div>
          <div>Rating : {data.movie.rating}</div>
        </>
      ) : (
        "No Detail..."
      )}
    </div>
  );
}

export default Detail;
