import mongoose from "mongoose";

export default async function connectToDB(){
        try {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("Connected To MongoDB");
        } catch (error) {
            console.log("error connecting to mongodb" , error);
        }
}