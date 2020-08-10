import mongoose, { Schema, Types } from "mongoose";
import { IMovie } from "./index";

export interface IActor extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  movieList: IMovie[];
}

const ActorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    movieList: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
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
