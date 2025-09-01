import mongoose from "mongoose";

export const getAllUsers = async () => {
    const usersCollection = mongoose.connection.db.collection('users');
    const usr = await usersCollection.find({}).toArray();
    return usr;
}