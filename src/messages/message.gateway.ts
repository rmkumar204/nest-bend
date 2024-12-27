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
    methods: ["GET", "POST"], // Allow these methods
    allowedHeaders: ["Content-Type"], // Allowed headers
    credentials: true, // Allow credentials (cookies, etc.)
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(
    @MessageBody() messageData: { senderId: number; text: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const message = await this.messagesService.createMessage(
      messageData.senderId,
      messageData.text,
    );
    socket.emit("receiveMessage", message); // Send to the current client
    socket.broadcast.emit("receiveMessage", message); // Broadcast to other clients
  }
}
