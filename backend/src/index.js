import dotenv from "dotenv";
import connectDB from "./database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
});

const startserver = async () => {
    try {
         console.log("MONGODN_URI:", process.env.MONGODB_URI);
        await connectDB();


        app.on("error",(error) => {
            console.log("ERROR", error);
            throw error;
        });

       app.listen(process.env.PORT || 8000, () => {
         console.log(`server is running on port :
            ${process.env.PORT}`);

       })
    }catch (error) {
        console.log("mongoDB connection failed!!", error);


    }
}

startserver();