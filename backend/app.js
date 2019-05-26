require('dotenv').config();
import init from './src/init';

async function start() {
  await init.start();
}

start();
