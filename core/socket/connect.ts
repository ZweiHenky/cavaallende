import { io } from "socket.io-client";

const ip = process.env.EXPO_PUBLIC_SOCKET_URL;


const socket = io(`http://${ip}:4000`, {
    autoConnect: true,
});



export default socket;