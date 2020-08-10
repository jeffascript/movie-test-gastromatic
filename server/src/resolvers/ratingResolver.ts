import { MoviesModel, IRating, RatingsModel } from "../models";
import { Context, MovieOrNull } from "../types";

import pubsub from "../pubsub";
import { findUserInDBWithContext } from "../helpers/auth";

export async function ratingsForMovie(_: void, args: any): Promise<IRating[]> {
  const { movieId } = args;
  const movie: MovieOrNull = await MoviesModel.findById(movieId);
  if (movie === null) {
    throw new Error("Movie does not exist!");
  }
  return RatingsModel.find({ movie: movie }).populate("user");
}

export async function addRating(
  _: void,
  args: any,
  ctx: Context,
): Promise<IRating> {
  const { movieId, count, comment } = args;

  const user = await findUserInDBWithContext(ctx);

  const movie: MovieOrNull = await MoviesModel.findById(movieId);
  if (movie === null) {
    throw new Error("Movie does not exist!");
  }
  const existingRating: number = await RatingsModel.countDocuments({
    movie: movie,
    ratedBy: user,
  });
  if (existingRating >= 1) {
    throw new Error("Movie already rated!");
  }

  const rating: IRating = new RatingsModel({
    count,
    comment,
    movie,
    ratedBy: user,
    isRatedByUser: true,
  });

  await rating.save();
  movie.ratings.push(rating);
  await movie.save();

  // push change to clients
  await pubsub.publish("ratingAdded", {
    ratingAdded: rating,
  });

  return rating;
}

export default {
  Mutation: {
    addRating,
  },
  Query: {
    ratingsForMovie,
  },
  Subscription: {
    ratingAdded: {
      subscribe: () => pubsub.asyncIterator("ratingAdded"),
    },
  },
};
