import 'reflect-metadata';
import { PostResolver } from './resolvers/post';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground as Playground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import path from 'path';

import { __prod__, COOKIE_NAME } from './constants';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'reddit',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Post],
  });
  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  app.use(
    session({
      secret: 'qiwejalsdlkj1203912ojzxcjlwd',
      resave: false,
      saveUninitialized: false,
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    plugins: [Playground()],
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
};

main();
