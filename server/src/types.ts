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

export interface IMovieDesign<T> {
  name: string;
  releaseDate: Date;
  durationPerSecond: number;
  actorsArray: T;
}
