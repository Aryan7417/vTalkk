import http from 'http'
import app from './app'
import connectDB from "./config/db";
import "dotenv/config";


const port = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(`📊 VTalk server running on http://localhost:${port}`);
  });
};

startServer();