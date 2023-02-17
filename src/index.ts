import path from "path";
import dotenv from "dotenv";
import { Server } from "http";
import { connectToDbServer } from "./db/dbconn";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

let server: Server;

function exitHandler() {
  if (server) {
    server.close(() => {
      console.log("Server Closed...!");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function unexpectedErrorHandler(error: any) {
  console.log("Unexpected Error...!");
  console.error(error);
  exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

if (isNaN(Number(process.env.PORT))) {
  console.log("PORT is not a Number");
}

const PORT: number = Number(process.env.PORT) || 8000;

connectToDbServer((err) => {
  if (err) throw err;

  console.log("Connected TO Database....");

  import("./app")
    .then(({ initializeApp }) => {
      const app = initializeApp();

      server = app.listen(PORT, () => {
        console.log(
          `Server is listening on port ${PORT} - ${process.env.HOSTNAME}`
        );
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received...!");

  if (server) server.close();
});
