import { gql } from "apollo-server";

const typeDef = gql`
  type Movie {
    id: ID!
    name: String!
    releaseDate: String!
    durationPerSecond: Int!
    actorsArray: [Actor!]!
  }

  type Query {
    allMovies: [Movie!]!
    oneMovie(id: String!): Movie!
  }

  type Mutation {
    addMovie(
      name: String!
      releaseDate: String!
      durationPerSecond: Int!
      actorsArray: [String!]!
    ): Movie!
    deleteMovie(id: String!): Boolean!
    editMovie(
      id: ID!
      name: String!
      releaseDate: String!
      durationPerSecond: Int!
      actorsArray: [String!]!
    ): Movie!
  }
`;

export default typeDef;
