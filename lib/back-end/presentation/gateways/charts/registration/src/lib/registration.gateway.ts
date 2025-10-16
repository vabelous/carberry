import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RegistrationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  // Обработка подключения клиента
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('userConnected', { clientId: client.id });
  }

  // Обработка отключения клиента
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('userDisconnected', { clientId: client.id });
  }

  // Обработка сообщений от клиента
  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    payload: { message: string; user: string }
  ): void {
    console.log('Received message:', payload);

    // Отправка сообщения всем подключенным клиентам
    this.server.emit('newMessage', {
      message: payload.message,
      user: payload.user,
      timestamp: new Date().toISOString(),
    });
  }

  // Обработка приватных сообщений
  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    client: Socket,
    payload: { to: string; message: string }
  ): void {
    // Отправка сообщения конкретному клиенту
    this.server.to(payload.to).emit('privateMessage', {
      from: client.id,
      message: payload.message,
    });
  }

  // Подписка на комнату
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  // Отправка сообщения в комнату
  @SubscribeMessage('roomMessage')
  handleRoomMessage(
    client: Socket,
    payload: { room: string; message: string }
  ): void {
    this.server.to(payload.room).emit('roomMessage', {
      from: client.id,
      message: payload.message,
    });
  }
}
