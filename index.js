// Imported Library
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";

// Config Files
import { disconnectFromDatabase } from "./config/db.config.js";
import Connection from "./config/db.config.js";

// Middlewares
import logger from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import verifyToken from "./middlewares/verifyToken.middleware.js";
import fileMiddleware from "./middlewares/multer.middeware.js"; // Responsible for transformming the form data and upload image to cloudinary

// Routes
import notFound from "./routes/notFound.routes.js";
import authenticationRoute from "./routes/auth.routes.js";
import logoutRoute from "./routes/logout.routes.js";
import patientRoute from "./routes/patientProfile.routes.js";
import hospitalRoute from "./routes/hospitalProfile.routes.js";
import staffRoute from "./routes/staffProfile.routes.js";
import appointmentRoute from "./routes/appointment.routes.js";

// Secret Key
const PORT = process.env.PORT || 8000;
const ORIGIN = process.env.ORIGIN;

// Express Server
const app = express();

// Body Parser
app.use(express.json());

// WebSocket Server
const server = http.createServer(app);

// Socket.io Server
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    methods: ["GET", "POST"],
  },
});

// CORS SETUP
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logger Middleware
app.use(logger);
app.use(fileMiddleware);

//App Routes
app.use("/auth", authenticationRoute); /* Authentication Routes */

// Verify Token Middleware to ensure user is logged in
app.use(verifyToken);

/* Logout Route */
app.use("/auth", logoutRoute);

// Patient Profile Routes
app.use("/patient", patientRoute);
// Hospital Profile Routes
app.use("/hospital", hospitalRoute);

// Staff Profile Routes
app.use("/staff", staffRoute);

// Appointment Routes
app.use("/appointment", appointmentRoute);

// Not Found Route
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Socket.io Connection
server.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
  await Connection();
});

// Handle Disconnection
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

process.on("unhandledRejection", async(reason, promise) => {
  console.log("Unhandled Rejection at:", promise);
  console.log("Reason:", reason);
  await disconnectFromDatabase();
  process.exit(1);
});
