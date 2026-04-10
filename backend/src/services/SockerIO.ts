import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import { DRIVERS_SOCKET_CHANNEL, CORS_OPTIONS } from "../config";
import { Driver } from "../model";

let io: Server;

export const initIO = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: CORS_OPTIONS.origin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("IO Not Initialized!");
  }
  return io;
};

const firstConnectionMap = new Map<string, boolean>();
// Map to store driver socket IDs
const driverSockets = new Map();

export const connectAdmin = (jwtKey: string) => {
  // Create a namespace for admin
  const adminNamespace = io.of("/admin");

  // Event handler when a client (admin) connects to the admin namespace

  adminNamespace.on("connection", async (socket: Socket) => {
    const adminId = socket.id;
    // Retrieve the token from the query parameters
    const token = socket.handshake.headers.authorization;
    try {
      if (token) {
        const payload = jwt.verify(token.split(" ")[1], jwtKey);
        if (payload) {
          if (!firstConnectionMap.has(adminId)) {
            // Emit the drivers-positions event
            getIO()
              .of("/admin")
              .to(adminId)
              .emit(DRIVERS_SOCKET_CHANNEL, await getDrivers());

            // Mark the first connection as completed for this admin client
            firstConnectionMap.set(adminId, true);
          }

          // Emit an event to the admin to acknowledge the connection
          socket.emit("admin-connected", "Admin Connected");

          // Event handler when the admin joins the drivers-positions room
          socket.on("join-drivers-positions", async (data) => {
            console.log("Admin joined drivers-positions room");
            // Join the drivers-positions room
            socket.join(DRIVERS_SOCKET_CHANNEL);
          });
        }
      } else {
        socket.leave(DRIVERS_SOCKET_CHANNEL);
        socket.disconnect();
      }
    } catch (_) {
      socket.leave(DRIVERS_SOCKET_CHANNEL);
      socket.disconnect();
    }

    // Event handler when the admin disconnects
    socket.on("disconnect", () => {
      console.log("Admin disconnected");
      // Leave the drivers-positions room upon disconnection
      socket.leave(DRIVERS_SOCKET_CHANNEL);
    });
  });
  // Function to emit drivers' positions to the drivers-positions room

  async function getDrivers() {
    return await Driver.find({ verified: true })
      .select("user location visible onTrip")
      .populate({
        path: "user",
        select: "firstName lastName profileImage",
      })
      .populate("location");
  }
};

// // Socket.IO connection handler for drivers
// function connectDriver() {

//     // Create a namespace for admin
//     const driverNamespace = io.of('/driver');

//     driverNamespace.on(
//         'connection',
//         (socket: Socket) => {
//             // Handle driver-connected event
//             socket.on('driver-connected', (data: any) => {
//                 const { driverId } = data;

//                 // Store the driver's socket ID for future reference
//                 driverSockets.set(driverId, socket.id);

//                 // Acknowledge the driver connection
//                 socket.emit('driver-connected', { message: 'Driver connected successfully' });
//             });

//             // Handle update-location event
//             socket.on('update-location', (data) => {
//                 const { driverId, location } = data;

//                 // Check if the driver is connected
//                 if (driverSockets.has(driverId)) {
//                     // Emit the update-location event to all connected admins
//                     getIO().of('/driver').emit('update-location', { driverId, location });
//                 }
//             });

//             // Handle update-visibility event
//             socket.on('update-visibility', (data) => {
//                 const { driverId, visibility } = data;

//                 // Check if the driver is connected
//                 if (driverSockets.has(driverId)) {
//                     // Emit the update-visibility event to all connected admins
//                     getIO().of('/driver').emit('update-visibility', { driverId, visibility });
//                 }
//             });

//             // Handle update-trip event
//             socket.on('update-trip', (data) => {
//                 const { driverId, trip } = data;

//                 // Check if the driver is connected
//                 if (driverSockets.has(driverId)) {
//                     // Emit the update-trip event to all connected admins
//                     getIO().of('/driver').emit('update-trip', { driverId, trip });
//                 }
//             });

//             // Handle socket disconnection
//             socket.on('disconnect', () => {
//                 // Remove the driver's socket ID from the driverSockets map
//                 const driverId = Array.from(driverSockets.entries()).find(([key, value]) => value === socket.id)?.[0];
//                 if (driverId) {
//                     driverSockets.delete(driverId);
//                 }
//             }
//             );
//         }
//     )

// }
