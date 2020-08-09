import mongoose from "mongoose";

interface IMovie extends mongoose.Document {
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  actorsArray: string[];
}

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    durationPerSecond: { type: Number, required: true },
    actorsArray: { type: [String] },
  },
  {
    versionKey: false,
  },
);

export const MovieModel = mongoose.model<IMovie>(
  "Movie",
  MovieSchema,
  "Movies",
);
