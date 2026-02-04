import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTIONSTRING
        );

        console.log("DB is connected");

    } catch(error) {
        console.error("Error! Can't connect to DB:", error);
        process.exit(1);
    }
}