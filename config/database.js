import "dotenv/config";
import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const result = await mongoose
      .connect(URI)
      .then(() => console.log("Connected to db"))
      .catch((err) => console.log("Failed to connect db"));
  } catch (error) {
    console.log({
      message: err.message,
    });
  }
};

export default connectDb;
