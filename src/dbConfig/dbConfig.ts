import mongoose from "mongoose";

 export async function connect() {
        try{
                await mongoose.connect(process.env.MONGO_URL!)
                const connection = mongoose.connection;
                
                connection.on("connected", () => {
                        console.log("MongoDB Connected");
                });

                connection.on("error", (err) => {
                        console.log("MongoDB Connection Error");
                        console.log(err);
                });
        }
        catch(err) {
                console.log("Something went wrong");
                console.log(err);
        }
 }