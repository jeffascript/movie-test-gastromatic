import { IMovie, MoviesModel } from "../models";
import { Context, IMovieResultDesign, MovieOrNull } from "../types";
import pubsub from "../pubsub";
import {
  formatMovieResponse,
  findUserInDBWithContext,
  actorMappingToDB,
} from "../helpers";

const allMovies = async (_: void): Promise<IMovieResultDesign[]> => {
  const moviesFromDB: IMovie[] = await MoviesModel.find({})
    .populate("actorsArray")
    .populate({ path: "ratings.ratedBy" });

  return formatMovieResponse(moviesFromDB);
};

export const oneMovie = async (
  _: void,
  args: any,
): Promise<IMovieResultDesign> => {
  const movie: IMovie | null = await MoviesModel.findById(args.id)
    .populate("actorsArray")
    .populate({ path: "ratings.ratedBy" });
  if (movie === null) {
    throw new Error("Movie does not exist!");
  }
  return formatMovieResponse(movie);
};

async function releaseDate(parent: IMovie): Promise<String> {
  return parent.releaseDate.toLocaleDateString();
}

export const createMovie = async (
  _: void,
  args: any,
  ctx: Context,
): Promise<IMovie> => {
  const { name, releaseDate, durationPerSecond, actorsArray } = args;
  const user = await findUserInDBWithContext(ctx);
  const existingMovie: number = await MoviesModel.countDocuments({ name });
  if (existingMovie) {
    throw new Error("Movie already in Database!");
  }
  let actorArray = await actorMappingToDB(actorsArray);

  const movie: IMovie = new MoviesModel({
    name,
    releaseDate: new Date(releaseDate).toUTCString(),
    durationPerSecond,
    actorsArray: actorArray,
  });
  await movie.save();

  actorArray.forEach(async (oneActor) => {
    oneActor.movies.push(movie);
    await oneActor.save();
  });

  await pubsub.publish("moviePayload", {
    moviePayload: {
      movie: movie,
      user: user,
      type: "added",
    },
  });
  return movie;
};

const editOneMovie = async (
  _: void,
  args: any,
  ctx: Context,
): Promise<IMovie> => {
  const { id, name, releaseDate, durationSeconds, actorsArray } = args;
  const user = await findUserInDBWithContext(ctx);
  const movie: MovieOrNull = await MoviesModel.findById(id);
  if (movie === null) {
    throw new Error("Movie not available");
  }
  if (name !== null && name !== undefined) {
    movie.name = name;
  }
  if (releaseDate !== null && releaseDate !== undefined) {
    movie.releaseDate = releaseDate;
  }
  if (durationSeconds !== null && durationSeconds !== undefined) {
    movie.durationPerSecond = durationSeconds;
  }

  movie.actorsArray = await actorMappingToDB(actorsArray);
  await movie.save();

  await pubsub.publish("moviePayload", {
    moviePayload: {
      movie: movie,
      user: user,
      type: "new changes!",
    },
  });

  return movie;
};

const deleteOneMovie = async (
  _: void,
  args: any,
  ctx: Context,
): Promise<boolean> => {
  const { id } = args;
  const user = await findUserInDBWithContext(ctx);
  const movie = await MoviesModel.findOneAndDelete({ _id: id });

  if (movie !== null) {
    await pubsub.publish("moviePayload", {
      //client emit
      moviePayload: {
        movie: movie,
        user: user,
        type: "movie has been deleted!!",
      },
    });
    return true;
  }

  return false;
};

export default {
  Query: {
    allMovies,
    oneMovie,
  },
  Mutation: {
    createMovie,
    deleteOneMovie,
    editOneMovie,
  },
  Subscription: {
    moviePayload: {
      subscribe: () => pubsub.asyncIterator("moviePayload"),
    },
  },
  Movie: {
    releaseDate,
  },
};
