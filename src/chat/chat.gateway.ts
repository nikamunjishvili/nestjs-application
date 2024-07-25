import { SubscribeMessage, MessageBody, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  path: '/api/chat',
  namespace: 'chat',
  cors: {
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('messages')
  handleEvent(@MessageBody() message: string): object {
    this.server.emit('message', message);
    console.log(message)
    return {
        message: message,
    }
  }
}
