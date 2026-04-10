"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAdmin = exports.getIO = exports.initIO = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const socket_io_1 = require("socket.io");
const config_1 = require("../config");
const model_1 = require("../model");
let io;
const initIO = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: config_1.CORS_OPTIONS.origin,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
};
exports.initIO = initIO;
const getIO = () => {
    if (!io) {
        throw new Error("IO Not Initialized!");
    }
    return io;
};
exports.getIO = getIO;
const firstConnectionMap = new Map();
// Map to store driver socket IDs
const driverSockets = new Map();
const connectAdmin = (jwtKey) => {
    // Create a namespace for admin
    const adminNamespace = io.of("/admin");
    // Event handler when a client (admin) connects to the admin namespace
    adminNamespace.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = socket.id;
        // Retrieve the token from the query parameters
        const token = socket.handshake.headers.authorization;
        try {
            if (token) {
                const payload = jsonwebtoken_1.default.verify(token.split(" ")[1], jwtKey);
                if (payload) {
                    if (!firstConnectionMap.has(adminId)) {
                        // Emit the drivers-positions event
                        (0, exports.getIO)()
                            .of("/admin")
                            .to(adminId)
                            .emit(config_1.DRIVERS_SOCKET_CHANNEL, yield getDrivers());
                        // Mark the first connection as completed for this admin client
                        firstConnectionMap.set(adminId, true);
                    }
                    // Emit an event to the admin to acknowledge the connection
                    socket.emit("admin-connected", "Admin Connected");
                    // Event handler when the admin joins the drivers-positions room
                    socket.on("join-drivers-positions", (data) => __awaiter(void 0, void 0, void 0, function* () {
                        console.log("Admin joined drivers-positions room");
                        // Join the drivers-positions room
                        socket.join(config_1.DRIVERS_SOCKET_CHANNEL);
                    }));
                }
            }
            else {
                socket.leave(config_1.DRIVERS_SOCKET_CHANNEL);
                socket.disconnect();
            }
        }
        catch (_) {
            socket.leave(config_1.DRIVERS_SOCKET_CHANNEL);
            socket.disconnect();
        }
        // Event handler when the admin disconnects
        socket.on("disconnect", () => {
            console.log("Admin disconnected");
            // Leave the drivers-positions room upon disconnection
            socket.leave(config_1.DRIVERS_SOCKET_CHANNEL);
        });
    }));
    // Function to emit drivers' positions to the drivers-positions room
    function getDrivers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Driver.find({ verified: true })
                .select("user location visible onTrip")
                .populate({
                path: "user",
                select: "firstName lastName profileImage",
            })
                .populate("location");
        });
    }
};
exports.connectAdmin = connectAdmin;
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
