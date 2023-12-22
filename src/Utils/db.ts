import mongoose from "mongoose";
 
let isConnected = false;
 
export const connectToDB = async () => {
  
    const uri = process.env.MONGODB_URI!
    mongoose.set("strictQuery", true);
   
    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }
  
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
        isConnected = true;
        
    } catch (error) {
        console.log(error);
        
    }
}