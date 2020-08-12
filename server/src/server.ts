// import { populateData } from "./data/dbPopulate";
import mongoose from "mongoose";
import yargs from "yargs";
import { ApolloServer } from "apollo-server";
import { getUserInfo } from "./auth";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const args = yargs.option("mongo-uri", {
  describe: "Mongo URI",
  default: "mongodb://localhost:27017/gastromovies",
  type: "string",
  group: "Mongo",
}).argv;

async function start() {
  try {
    await mongoose.connect(args["mongo-uri"], {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    //await populateData();
    console.log("Connected to DB.");

    await new ApolloServer({
      cors: {
        origin: "*",
        credentials: true,
      },
      typeDefs,
      resolvers,
      context: async ({ req, connection }) => {
        return connection
          ? connection.context
          : { userInfo: getUserInfo(req.headers.authorization || "") };
      },
    }).listen(5000);
    console.log("GraphQl API running on port 5000.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
