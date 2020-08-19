import bcrypt from "bcryptjs";
import { Context } from "./../types";
import { movieData } from "./movieDbData";
import { User, UserModel } from "../models";
import { createMovie } from "../resolvers/movieResolver";
import { rateTheMovie } from "../resolvers/ratingResolver";

export const populateData = async () => {
  try {
    const entryUser: User = new UserModel({
      username: "user1",
      password: await bcrypt.hash("password", 10),
    });
    await entryUser.save();
    const { _id, username } = entryUser;

    const context: Context = {
      userInfo: { username: username, id: _id.toHexString() },
    };

    // const rand = Math.floor(Math.random() * 5) + 1;
    let aMovie: any;
    let movieForRating: any;
    movieData.forEach(async (data) => {
      aMovie = await createMovie(undefined, { ...data }, context);
      if (aMovie.name === "Tiger King") {
        movieForRating = aMovie._id;
        await rateTheMovie(
          undefined,
          {
            movieId: aMovie._id,
            count: 3,
            comment: "I rated this movie first ....yihaoooo!!",
          },
          context,
        );
        console.log(movieForRating, "rating");
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
