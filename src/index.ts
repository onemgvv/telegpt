import { config as DotEnvConfig } from 'dotenv';
DotEnvConfig({
  path: `.env.${process.env.NODE_ENV}`,
});

import StartBot from './bot';
// import AppDataSource from '@db';

const Start = async () => {
  console.log('Trying to connect to the database');
  // await AppDataSource.initialize()
  //   .then(() => console.log('Connected to the database'))
  //   .catch((error) => console.log(error));
  await StartBot();
};

Start();
