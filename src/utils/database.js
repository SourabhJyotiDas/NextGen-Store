import mongoose from "mongoose";

const connnection = {};

export const dbConnect = async () => {
   if (connnection.isConnected) {
      console.log("Already connected to database");
      return;
   };
   try {
      const db = await mongoose.connect(process.env.MONGOURI);

      connnection.isConnected = db.connections[0].readyState;

      console.log("Database connected successfully");
   } catch (error) {
      console.log("Database connection failed", error);
      process.exit(1);
   }
};
