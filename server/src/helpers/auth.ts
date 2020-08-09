import { User, UserModel } from "src/models";
import { Context } from "src/types";

export const findUserInDBWithContext = async (ctx: Context): Promise<User> => {
  const { userInfo } = ctx;
  if (!userInfo) {
    throw new Error("Not authenticated!");
  }
  const user: User | null = await UserModel.findOne({ _id: userInfo.id });
  if (!user) {
    throw new Error("Not authenticated!");
  }
  return user;
};
