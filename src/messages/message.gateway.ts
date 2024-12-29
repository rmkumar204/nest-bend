import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./message.service";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
    credentials: true, // Allow credentials (cookies, etc.)
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private messagesService: MessagesService) {}

  /** ✅ Handle New Connections */
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  /** ✅ Handle Disconnections */
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  /** ✅ Handle Incoming Messages */
  @SubscribeMessage("sendMessage")
  async handleMessage(
    @MessageBody()
    messageData: { senderId: number; receiverId: number; text: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log("Received Message:", messageData);
    const message = await this.messagesService.createMessage(
      messageData.senderId,
      messageData.receiverId,
      messageData.text,
    );
    socket.emit("receiveMessage", message);
    socket.broadcast.emit("receiveMessage", message);
  }
}
