import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {

      try {
            const con = await mongoose.connect(process.env.MONGODB_URI, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB", con.connection.host);
      } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
      }
}