import { gql } from "apollo-server";

const typeDef = gql`
  type Movie {
    id: ID!
    name: String!
    releaseDate: String!
    durationPerSecond: Int!
    actorsArray: [Actor!]!
    ratedByUser: Boolean
    ratings: [Rating]!
    numberOfRatings: Int!
    ratingsAverage: Float!
  }

  type Rating {
    id: ID!
    count: Int!
    comment: String!
    ratedBy: User!
    isRatedByUser: Boolean!
    movie: Movie
    createdAt: String!
  }

  type MoviePayload {
    movie: Movie!
    user: User!
    type: String!
  }

  #Using extend since  Query & mutation have been used initially in authSchema
  extend type Query {
    allMovies: [Movie!]!
    oneMovie(id: String!): Movie!
    oneMovieRatings(movieId: String!): [Rating!]!
  }

  extend type Mutation {
    createMovie(
      name: String!
      releaseDate: String!
      durationPerSecond: Int!
      actorsArray: [String!]!
    ): Movie!

    deleteOneMovie(id: String!): Boolean!

    editOneMovie(
      id: ID!
      name: String!
      releaseDate: String!
      durationPerSecond: Int!
      actorsArray: [String!]!
    ): Movie!

    rateTheMovie(movieId: String!, count: Int!, comment: String!): Rating!
  }

  type Subscription {
    newRatingAlert: Rating!
    moviePayload: MoviePayload!
  }
`;

export default typeDef;
