import mongoose from "mongoose";

const uri = "mongodb://localhost:5005";

export async function connectToDb() {
  try {
    await mongoose.connect(uri, {
      dbName: "bookkeeper_db",
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
