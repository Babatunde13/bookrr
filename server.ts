import http from 'http';
import express, { Application, Request, Response } from 'express'
import os from 'os'
import cluster, { Worker } from 'cluster'
import { graphqlHTTP } from 'express-graphql'
import { schema, resolver } from './schema'
import envs from './envs'
import db from './db'

const forks = new Set<Worker>()

const httpServer = async () => {
    let server: http.Server;
    if (cluster.isPrimary) {
        const cpuCount = os.cpus().length;
        for (let i = 0; i < cpuCount; i++) {
            const fork = cluster.fork();
            forks.add(fork);
        }
        cluster.on('online', (worker: any, code: any, signal: any) => {
            console.log(`worker ${worker.process.pid} connected`);
        });
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        server = await startServer();
    }
}


db.db.once('open', async () => {
    console.log('Connected to MongoDB');
    await httpServer();
});

db.db.on('error', async (err: Error) => {
    console.log('Error connecting to MongoDB', err.message);
    process.exit(1);
});

const startServer = async () => {
    const app: Application = express();
    app.use(express.json());
    app.use(envs.graphqlPath, graphqlHTTP({
        schema,
        rootValue: resolver,
        graphiql: true,
        customFormatErrorFn: (err: any) => {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return {
                message: message,
                status: code,
                data: data,
            };
        },
    }));

    return app.listen(envs.port, () => {
        console.log(`Server is running on port ${envs.port}`);
    });
}
