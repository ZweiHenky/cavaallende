import { io } from "socket.io-client";

const ip = process.env.EXPO_PUBLIC_SOCKET_URL;

console.log("ip", ip);

const socket = io(`https://smooth-muskox-luckily.ngrok-free.app`, {
    autoConnect: true,
    transports: ["websocket"],
});



export default socket;