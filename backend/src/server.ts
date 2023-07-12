import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import router from "./routes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// Starting the server
app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const start = async () => {
  try {
    // Creating the mongoDB memory server
    const mongoServer = await MongoMemoryServer.create();

    // Connecting to the mongoDB memory server using mongoose
    await mongoose.connect(mongoServer.getUri(), { dbName: "notificationsDB" });
  } catch (error: unknown) {
    console.log(error);
    process.exit(1);
  }
};

process.on("beforeExit", async () => {
  await mongoose.disconnect();
  console.log("mongoose disconnected");
});

if (require.main === module) {
  start();
}

export { start, app };
