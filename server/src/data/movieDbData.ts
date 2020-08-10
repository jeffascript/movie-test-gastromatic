import { IDataInitialization } from "./../types";

export const movieData: IDataInitialization[] = [
  {
    name: "Mad Max: Fury Road",
    releaseDate: new Date("15 May 2015"),
    durationPerSecond: 120 * 60, // initial data in minutes, converting to seconds
    actorsArray: [
      "Tom Hardy",
      "Charlize Theron",
      " Nicholas Hoult",
      "Hugh Keays-Byrne",
    ],
  },
  {
    name: "Catch Me If You Can",
    releaseDate: new Date("25 Dec 2002"),
    durationPerSecond: 141 * 60,
    actorsArray: [
      "Tom Hardy",
      "Charlize Theron",
      " Nicholas Hoult",
      "Hugh Keays-Byrne",
    ],
  },
  {
    name: "Crouching Tiger, Hidden Dragon",
    releaseDate: new Date("25 Dec 2002"),
    durationPerSecond: 120 * 60,
    actorsArray: ["Yun-Fat Chow", "Michelle Yeoh", "Ziyi Zhang", "Chen Chang"],
  },
  {
    name: "Tiger King",
    releaseDate: new Date("20 Mar 2020"),
    durationPerSecond: 317 * 60,
    actorsArray: [
      "John Reinke",
      "Kelci Saffery",
      "John Finlay",
      "Rick Kirkham",
    ],
  },
  {
    name: "The Godfather",
    releaseDate: new Date("24 Mar 1972"),
    durationPerSecond: 175 * 60,
    actorsArray: [
      "Marlon Brando",
      "Al Pacino",
      "James Caan",
      "Richard S. Castellano",
    ],
  },
];
