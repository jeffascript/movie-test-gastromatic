import { gql } from "apollo-server";

const typeDef = gql`
  type Movie {
    id: ID!
    name: String!
    releaseDate: String!
    durationPerSecond: Int!
    actorsArray: [Actor!]!
    ratings: [Rating]
  }

  type Rating {
    id: ID!
    count: Int!
    comment: String!
    ratedBy: [User]!
    isRatedByUser: Boolean!
    # movie: Movie!
    createdAt: String!
  }

  #Using extend since  Query & mutation have been used initially in authSchema
  extend type Query {
    allMovies: [Movie!]!
    oneMovie(id: String!): Movie!
  }

  extend type Mutation {
    addOneMovie(
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
  }
`;

export default typeDef;
