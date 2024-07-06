import mongoose from "mongoose";
export const dbConnection = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName : "Job_seaking_project"
    })
    .then(()=>{
        console.log("DataBase connected Successfully!!")
    })
}