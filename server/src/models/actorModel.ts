import mongoose, { Schema } from "mongoose";
import { IMovie } from "./index";

export interface IActor extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  movies: IMovie[];
}

const ActorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  {
    versionKey: false,
  },
);

export const ActorsModel = mongoose.model<IActor>(
  "Actor",
  ActorSchema,
  "Actors",
);
