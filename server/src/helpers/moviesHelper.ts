import { IMovie, IActor, ActorsModel } from "../models";
import { IMovieResultDesign } from "../types";

export const reMappedResponse = (data: any) => {
  return data.map(formatMovieResponse);
};

export const formatMovieResponse = (movie: IMovie): IMovieResultDesign => {
  let movieResult = {
    id: movie._id.toHexString(),
    name: movie.name,
    durationPerSecond: movie.durationPerSecond,
    releaseDate: movie.releaseDate,
    actorsArray: movie.actorsArray,
    ratings: movie.ratings,
    //ratedByUser: movie.ratings.some((a) => a.ratedBy.id === users._id),

    ratingsAverage: movie.ratings
      .map((rating) => rating.count)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
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
  let newActorArray: IActor[] = [];
  console.log("1st", typeof newActorArray);

  // nameOfActor.forEach(async (oneActor) => //foreach fires before the promise is resolved,hnc we us for..of or Map but with Promise.all
  for (const oneActor of nameOfActor) {
    let actorInDB: IActor | null = await ActorsModel.findOne({
      name: oneActor,
    });

    if (actorInDB !== null) {
      //console.log(actorInDB);
      newActorArray = [...newActorArray, actorInDB];
      //newActorArray.push(actorInDB);
      //console.log("existing", newActorArray);
    } else {
      let newActor: IActor = new ActorsModel({
        name: oneActor,
      });
      await newActor.save();
      newActorArray = [...newActorArray, newActor];
      // newActorArray.push(newActor);
      // console.log("NON existing", newActorArray);
    }
  }
  console.log("last", newActorArray);

  return newActorArray;
};
