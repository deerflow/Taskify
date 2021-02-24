import * as http from "http";
import {Server} from "http";
import * as dotenv from 'dotenv';
import app from './app';
import * as mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.error(e));

const server: Server = http.createServer(app);

server.listen(process.env.SERVER_PORT || 4444, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT || 4444}`);
});