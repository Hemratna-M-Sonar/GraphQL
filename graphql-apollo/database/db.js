import mongoose from "mongoose";

const connectDB = (uri) => {
    mongoose.connect(uri, {
        dbName: "ecom"
    }).then((conn)=>{
        console.log(`Db connected with ${conn.connection.name}`);
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDB;