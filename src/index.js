import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';
import "babel-polyfill";

mongoose.connect('mongodb://localhost:27017/TrelloClone');

const port = 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware(app);
app.use(cors);

app.listen({port}, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});