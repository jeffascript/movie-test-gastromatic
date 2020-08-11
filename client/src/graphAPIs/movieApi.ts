import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query movies {
    movies {
      id
      name
      durationSeconds
      releaseDate
      actors {
        id
        name
      }
      averageRating
      ratingCount
    }
  }
`;
