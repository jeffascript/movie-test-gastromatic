import { IActor, User } from "./index";
import mongoose from "mongoose";

export interface IRating extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  count: number;
  comment: string;
  ratedBy: User[];
  isRatedByUser: boolean;
}

export interface IMovie extends mongoose.Document {
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  actorsArray: IActor[];
  ratings: IRating[];
}

const ratingSubSchema = new mongoose.Schema(
  {
    ratedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    count: { type: Number, required: true },
    comment: { type: String, required: false },
    isRatedByUser: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    durationPerSecond: { type: Number, required: true },
    actorsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
    ratings: [ratingSubSchema],
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
