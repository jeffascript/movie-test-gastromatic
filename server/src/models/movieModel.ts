import { IActor, User } from "./index";
import mongoose from "mongoose";

export interface IRating extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  count: number;
  comment: string;
  ratedBy: User;
  isRatedByUser: boolean;
  movie: IMovie;
}

export interface IMovie extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  actors: any[];
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  actorsArray: IActor[];
  ratings: IRating[];
}

const RatingSchema = new mongoose.Schema(
  {
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    count: { type: Number, required: true },
    comment: { type: String, required: false },
    isRatedByUser: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    durationPerSecond: { type: Number, required: true },
    actorsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  },
  {
    versionKey: false,
  },
);

export const MoviesModel = mongoose.model<IMovie>(
  "Movie",
  MovieSchema,
  "Movies",
);

export const RatingsModel = mongoose.model<IRating>(
  "Rating",
  RatingSchema,
  "Ratings",
);

export default {
  MoviesModel,
  RatingsModel,
};
