import { oneMovie } from "./../../../server/src/resolvers/movieResolver";
import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query movies {
    allMovies {
      id
      name
      durationPerSecond
      releaseDate
      actorsArray {
        id
        name
      }
      ratings {
        id
        isRatedByUser
        count
        comment

        ratedBy {
          id
          username
        }
      }
      numberOfRatings
      ratingsAverage
    }
  }
`;

export const GET_ONE_MOVIE_AND_RATINGS = gql`
  query oneMovie($id: String!) {
    oneMovie(id: $id) {
      id
      name
      releaseDate
      durationPerSecond
      actorsArray {
        id
        name
      }
      ratings {
        id
        isRatedByUser
        count
        comment

        ratedBy {
          id
          username
        }
      }
      numberOfRatings
      ratingsAverage
    }
  }
`;

export const CREATE_ONE_MOVIE = gql`
  mutation createMovie(
    $name: String!
    $releaseDate: String!
    $durationPerSecond: Int!
    $actorsArray: [String!]!
  ) {
    addMovie(
      name: $name
      releaseDate: $releaseDate
      durationPerSecond: $durationPerSecond
      actorsArray: $actorsArray
    ) {
      id
      name
      releaseDate
      durationPerSecond
      actorsArray {
        id
        name
      }
    }
  }
`;

export const UPDATE_ONE_MOVIE = gql`
  mutation editOneMovie(
    $id: ID!
    $name: String!
    $releaseDate: String!
    $durationPerSecond: Int!
    $actorsArray: [String!]!
  ) {
    editMovie(
      id: $id
      name: $name
      durationPerSecond: $releaseDate
      durationPerSecond: $durationPerSecond
      actorsArray: $actorsArray
    ) {
      id
      name
      releaseDate
      durationPerSecond
      actorsArray {
        id
        name
      }
    }
  }
`;

export const DELETE_ONE_MOVIE = gql`
  mutation deleteOneMovie($id: String!) {
    deleteMovie(id: $id)
  }
`;
