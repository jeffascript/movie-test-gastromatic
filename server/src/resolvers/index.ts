import movieResolverMaps from "./movieResolver";
import { currentUser, register, login } from "./auth";
import ratingResolversMaps from "./ratingResolver";

const authResolverMap = {
  Query: {
    currentUser,
  },
  Mutation: {
    login,
    register,
  },
};

export default [authResolverMap, movieResolverMaps, ratingResolversMaps];
