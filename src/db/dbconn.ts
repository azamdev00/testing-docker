import { AnyError, Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const connectionString = process.env.MONGO_DB_URL!;

const client: MongoClient = new MongoClient(connectionString);

let dbConnection: Db;

export const connectToDbServer = function (callback: (err?: AnyError) => void) {
  client
    .connect()
    .then(() => {
      dbConnection = client.db(process.env.DB_NAME!);
      return callback();
    })
    .catch((err) => {
      return callback(err);
    });
};

export const getDB = function () {
  return dbConnection;
};
