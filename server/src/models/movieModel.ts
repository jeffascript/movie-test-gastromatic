import { IActor } from "./actorModel";
import mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  actorsArray: IActor[]; //string[]
}

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    durationPerSecond: { type: Number, required: true },
    actorsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
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
