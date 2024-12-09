import app from './app';
import config from './app/config';

// getting-started.js
import mongoose from 'mongoose';
import { Server } from 'http';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));

process.on('unhandledRejection', ()=>{
  console.log("Unhandled rejection detected! Shutting down the server!");
  if(server){
    server.close((=>{
      process.exit(1)
    }))
  }
});

process.on("uncaughtException", ()=>{
  console.log("Uncaught exception detected! Shutting down!");
  process.exit(1);
})
