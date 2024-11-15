import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || "";

let isConnected = false;
if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

export default async function connectToDatabase() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connection.readyState === 1;
    console.log("Connected to MongoDB successful... ");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error in connecting to mongoDB: ", error);
    } else {
      console.log("Error in faild connecting to database !!! ");
    }
  }
}
