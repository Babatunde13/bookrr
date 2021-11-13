import express, { Application, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema, resolver } from './schema'
import envs from './envs.js'
import db from './db'

db.db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.db.on('error', (err: Error) => {
    console.log('Error connecting to MongoDB', err);
    process.exit(1);
});

const app: Application = express();
app.use(express.json());

app.use(
    envs.graphqlPath,
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: {
            request,
            response,
        },
    }))
);

app.listen(envs.port, () => {
    console.log(`Server is running at http://localhost:${envs.port}${envs.graphqlPath}`);
});
