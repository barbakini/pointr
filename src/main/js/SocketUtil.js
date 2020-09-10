import SockJS from "sockjs-client";
import "./stomp.min"

const socket = new SockJS('/weather-websocket');
const stompClient = Stomp.over(socket);


export default stompClient;