import { IActor, ActorsModel } from "../models";

export async function actors(_: void): Promise<IActor[]> {
  return ActorsModel.find({});
}

export default {
  Query: {
    actors,
  },
};
