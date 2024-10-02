import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
        process.env.MONGODB_URI
    );
    console.log(`Mongodb Connected successfully ${connect.connection.host}`);
  } catch (error) {
    console.log("While connecting this happend", error);
    process.exit(1); // 1 code means exit with failure, and 0 mean success
  }
};
