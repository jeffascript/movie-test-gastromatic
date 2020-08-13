/*

const typeDef = gql`
type Actor { 
  id: ID!
  name: String!
}

extend type Query {
  actors: [Actor!]!
}
`;

const typeDef = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    currentUser: User!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
  }
`;


const typeDef = gql`
  type Movie {
    id: ID!
    name: String!
    releaseDate: String!
    durationPerSecond: Int!
    actorsArray: [Actor!]!
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

  */
