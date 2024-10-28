// Imported Modules
import express from 'express';
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';
import "dotenv/config";
import logger from './middlewares/logger.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import notFound from './routes/notFound.routes.js';


// Secret Key
const PORT = process.env.PORT || 8000;
const ORIGIN = process.env.ORIGIN


// Express Server
const app = express();

// WebSocket Server
const server = http.createServer(app);


// Logger Middleware
app.use(logger);




// Socket.io Server
const io = new Server(server, {
    cors : {
        origin : ORIGIN,
        methods: ["GET", "POST"]
    }
})

// CORS SETUP       
app.use(cors({
    origin : ORIGIN,
    methods: ["GET", "POST" , "PUT", "DELETE" , "PATCH"],
    allowedHeaders : ["Content-Type" , "Authorization"]
}))




// Not Found Route
app.use(notFound);

app.use(errorHandler);
// Socket.io Connection
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
