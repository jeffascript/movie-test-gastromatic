import bcrypt from "bcryptjs";
import { Context } from "./../types";
import { movieData } from "./movieDbData";
import { User, UserModel } from "../models";
import { createMovie } from "../resolvers/movieResolver";
// import { rateTheMovie } from "../resolvers/ratingResolver";

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

    movieData.map(async (data) => {
      await createMovie(undefined, { ...data }, context);

      return;
    });

    // await rateTheMovie(
    //     undefined,
    //     { value: rand, comment: "Best Movie!!!!" },
    //     context,
    //   );
    //   if (!a) return;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
