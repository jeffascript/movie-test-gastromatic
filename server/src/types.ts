import { IActor, IRating, IMovie } from "./models";

export interface RegisterResponse extends UserInfo {}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
}

export interface Context {
  userInfo: UserInfo;
}

interface IRespMovies<A, R> {
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  ratings: R; //array
  ratingsAverage: number;
  numberOfRatings: number;
  actorsArray: A; //array
}

export interface IMovieResultDesign extends IRespMovies<IActor[], IRating[]> {}

export interface IDataInitialization {
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  actorsArray: Array<string>;
}

export type MovieOrNull = IMovie | null;
