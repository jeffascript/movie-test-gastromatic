import { MoviesModel, IRating, RatingsModel } from "../models";
import { Context, MovieOrNull } from "../types";
import pubSub from "../pubsub";
import { findUserInDBWithContext } from "../helpers/auth";

export const rateTheMovie = async (
  _: void,
  args: any,
  ctx: Context,
): Promise<IRating> => {
  const { movieId, count, comment } = args;

  const user = await findUserInDBWithContext(ctx);

  const movie: MovieOrNull = await MoviesModel.findById(movieId);
  if (movie === null) {
    throw new Error("Movie not available!");
  }
  const existingRating: number = await RatingsModel.countDocuments({
    movie: movie,
    ratedBy: user,
  });
  if (existingRating >= 1) {
    throw new Error("Movie already rated by you!");
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

  await pubSub.publish("newRatingAlert", {
    newRatingAlert: rating,
  });

  return rating;
};

export const oneMovieRatings = async (
  _: void,
  args: any,
): Promise<IRating[]> => {
  const { movieId } = args;
  const movie: MovieOrNull = await MoviesModel.findById(movieId);
  if (movie === null) {
    throw new Error(
      "Invalid movied ID! Movie might be unavailble at this time!",
    );
  }
  return RatingsModel.find({ movie: movie }).populate("user");
};

export default {
  Query: {
    oneMovieRatings,
  },
  Mutation: {
    rateTheMovie,
  },

  Subscription: {
    newRatingAlert: {
      subscribe: () => pubSub.asyncIterator("newRatingAlert"),
    },
  },
};
