import mongoose from "mongoose";
import { User, IMovie } from "./index";

export interface IRating extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  count: number;
  comment: string;
  ratedBy: User;
  movie: IMovie;
}

const RatingsSchema = new mongoose.Schema(
  {
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    count: { type: Number, required: true },
    comment: { type: String, required: false },
  },
  {
    versionKey: false,
  },
);

export const RatingsModel = mongoose.model<IRating>(
  "Rating",
  RatingsSchema,
  "Ratings",
);
