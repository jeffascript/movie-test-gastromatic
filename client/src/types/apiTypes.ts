//USER TYPES
export interface IUser {
  id: string;
  username: string;
}
export interface ICurrentUser {
  currentUser: IUser;
}

//MOVIE & RATINGS TYPES

export interface IMovie {
  id: string;
  name: string;
  durationPerSecond: number;
  releaseDate: string;
  actorsArray: IActor[];
  numberOfRatings: number;
  ratingsAverage: number;
}
export interface IRating {
  id: string;
  user: IUser;
  count: number;
  ratedBy: IUser;
  isRatedByUser: boolean;
  comment: string;
  dateCreated: string;
}

//ACTOR TYPES

export interface IActor {
  id: string;
  name: string;
}

// export interface GetMovies {
//     movies: Movie[];
// }

// export interface GetMovieById {
//     movie: Movie;
// }

// export interface GetRatings {
//     ratingsForMovie: Rating[];
// }

// export interface GetCurrentUser {
//     currentUser: User;
// }

// export interface GetAlreadyRated {
//     alreadyRated: boolean;
// }

// export interface MovieAction {
//     movieAction: {
//         movie: {
//             id: string;
//             name: string;
//         };
//         user: {
//             id: string;
//             username: string;
//         };
//         type: string;
//     }
// }
