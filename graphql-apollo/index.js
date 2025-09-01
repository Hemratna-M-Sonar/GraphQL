import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './graphql/schema/schema.js';
import connectDB from './database/db.js';
import mongoose from 'mongoose';
import { getAllUsers } from './controllers/userController.js';

const port = 3000;

const mongoURI = "mongodb://127.0.0.1:27017";

connectDB(mongoURI);

const resolvers = {
    Query: {
        users: getAllUsers
    }
}


const server = new ApolloServer({
    typeDefs: schema,
    resolvers
})

startStandaloneServer(server, {
    listen: {port}
}).then(() => {
    console.log("Server is running on port 3000");
}).catch((err) => {
    console.log(err);
})