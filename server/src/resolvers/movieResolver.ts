import { IActor, ActorsModel, IMovie, MoviesModel } from "../models";
import { Context, IMovieResultDesign } from "../types";
import pubsub from "../pubsub";

import { findUserInDBWithContext } from "../helpers/auth";

async function allMovies(_: void): Promise<IMovieResultDesign[]> {
  return (
    await MoviesModel.find({})
      .populate("actorsArray")
      .populate({ path: "ratings.ratedBy" })
  ).map(mapMovie);
}

export async function oneMovie(
  _: void,
  args: any,
): Promise<IMovieResultDesign> {
  const movie: IMovie | null = await MoviesModel.findById(args.id)
    .populate("actorsArray")
    .populate({ path: "ratings.ratedBy" });
  if (movie === null) {
    throw new Error("Movie does not exist!");
  }
  return mapMovie(movie);
}

// map movie
export function mapMovie(movie: IMovie): IMovieResultDesign {
  let movieResult = {
    id: movie._id.toHexString(),
    name: movie.name,
    durationPerSecond: movie.durationPerSecond,
    releaseDate: movie.releaseDate,
    actorsArray: movie.actorsArray,
    ratings: movie.ratings,
    ratingsAverage: movie.ratings
      .map((r) => r.count)
      .reduce((a, b) => a + b, 0),
    numberOfRatings: movie.ratings.length,
  };
  if (movieResult.numberOfRatings > 0) {
    movieResult.ratingsAverage =
      movieResult.ratingsAverage / movieResult.numberOfRatings;
  }
  return movieResult;
}

async function releaseDate(parent: IMovie): Promise<String> {
  return parent.releaseDate.toLocaleDateString();
}

async function mapNewActors(actorsNames: string[]): Promise<IActor[]> {
  const actorArray: IActor[] = [];
  for (let i = 0; i < actorsNames.length; i++) {
    let existingActor: IActor | null = await ActorsModel.findOne({
      name: actorsNames[i],
    });
    if (existingActor !== null) {
      actorArray.push(existingActor);
    } else {
      let newActor: IActor = new ActorsModel({
        name: actorsNames[i],
      });
      await newActor.save();
      actorArray.push(newActor);
    }
  }
  return actorArray;
}

export async function addOneMovie(
  _: void,
  args: any,
  ctx: Context,
): Promise<IMovie> {
  const { name, releaseDate, durationPerSecond, actorsArray } = args;
  const user = await findUserInDBWithContext(ctx);
  const existingMovie: number = await MoviesModel.countDocuments({ name });
  if (existingMovie) {
    throw new Error("Movie already in Database!");
  }

  // Map actor names to database entries
  let actorArray = await mapNewActors(actorsArray);

  const movie: IMovie = new MoviesModel({
    name,
    releaseDate: new Date(releaseDate),
    durationPerSecond,
    actorsArray: actorArray,
  });
  await movie.save();

  for (let i = 0; i < actorArray.length; i++) {
    actorArray[i].movies.push(movie);
    // actorArray[i].movieList.push(movie);
    await actorArray[i].save();
  }

  // push change to clients
  await pubsub.publish("movieAction", {
    movieAction: {
      movie: movie,
      user: user,
      type: "added",
    },
  });

  return movie;
}

async function deleteOneMovie(
  _: void,
  args: any,
  ctx: Context,
): Promise<boolean> {
  const { id } = args;
  const user = await findUserInDBWithContext(ctx);
  const movie = await MoviesModel.findOneAndDelete({ _id: id });

  if (movie !== null) {
    // push change to clients
    await pubsub.publish("movieAction", {
      movieAction: {
        movie: movie,
        user: user,
        type: "deleted",
      },
    });
    return true;
  }

  return false;
}

async function editOneMovie(_: void, args: any, ctx: Context): Promise<IMovie> {
  const { id, name, releaseDate, durationSeconds, actorsArray } = args;
  const user = await findUserInDBWithContext(ctx);
  const movie: IMovie | null = await MoviesModel.findById(id);
  if (movie === null) {
    throw new Error("Movie does not exist");
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

  // Map actor names to database entries
  movie.actorsArray = await mapNewActors(actorsArray);

  await movie.save();

  // push change to clients
  await pubsub.publish("movieAction", {
    movieAction: {
      movie: movie,
      user: user,
      type: "edited",
    },
  });

  return movie;
}

export default {
  Query: {
    allMovies,
    oneMovie,
  },
  Mutation: {
    addOneMovie,
    deleteOneMovie,
    editOneMovie,
  },
  //   Subscription: {
  //     movieAction: {
  //       subscribe: () => pubsub.asyncIterator("movieAction"),
  //     },
  //   },
  Movie: {
    releaseDate,
  },
};
