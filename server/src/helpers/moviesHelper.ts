import { IMovie, IActor, ActorsModel } from "../models";
import { IMovieResultDesign } from "../types";

export const formatMovieResponse = (data: any) => {
  return data.map(reMappedResponse);
};

export const reMappedResponse = (movie: IMovie): IMovieResultDesign => {
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
};

export const actorMappingToDB = async (
  nameOfActor: string[],
): Promise<IActor[]> => {
  const newActorArray: IActor[] = [];

  nameOfActor.forEach(async (oneActor) => {
    let actorInDB: IActor | null = await ActorsModel.findOne({
      name: oneActor,
    });

    if (actorInDB !== null) {
      newActorArray.push(actorInDB);
    } else {
      let newActor: IActor = new ActorsModel({
        name: oneActor,
      });
      await newActor.save();
      newActorArray.push(newActor);
    }
  });

  return newActorArray;
};
