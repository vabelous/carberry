// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { WebsocketsPort } from '@carberry/front-end-core-ports-secondary-websockets';

export interface Message {
  user: string;
  message: string;
  timestamp: string;
}

@Injectable()
export class WebsocketsPortAdapter implements WebsocketsPort {
  private socket: Socket;


  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    });
  }

  // Подключение к сокету
  connect(): void {
    this.socket.connect();
  }

  // Отключение от сокета
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Отправка сообщения
  sendMessage(message: string, user: string): void {
    this.socket.emit('sendMessage', { message, user });
  }

  // Отправка приватного сообщения
  sendPrivateMessage(to: string, message: string): void {
    this.socket.emit('privateMessage', { to, message });
  }

  // Присоединение к комнате
  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }

  // Отправка сообщения в комнату
  sendRoomMessage(room: string, message: string): void {
    this.socket.emit('roomMessage', { room, message });
  }

  // Получение новых сообщений
  onNewMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('newMessage', (data: Message) => {
        observer.next(data);
      });
    });
  }

  // Получение приватных сообщений
  onPrivateMessage(): Observable<{ from: string; message: string }> {
    return new Observable(observer => {
      this.socket.on('privateMessage', (data) => {
        observer.next(data);
      });
    });
  }

  // Получение сообщений из комнаты
  onRoomMessage(): Observable<{ from: string; message: string }> {
    return new Observable(observer => {
      this.socket.on('roomMessage', (data) => {
        observer.next(data);
      });
    });
  }

  // Подключение пользователя
  onUserConnected(): Observable<{ clientId: string }> {
    return new Observable(observer => {
      this.socket.on('userConnected', (data) => {
        observer.next(data);
      });
    });
  }

  // Отключение пользователя
  onUserDisconnected(): Observable<{ clientId: string }> {
    return new Observable(observer => {
      this.socket.on('userDisconnected', (data) => {
        observer.next(data);
      });
    });
  }

  // Событие подключения
  onConnect(): Observable<void> {
    return new Observable(observer => {
      this.socket.on('connect', () => {
        observer.next();
      });
    });
  }

  // Событие отключения
  onDisconnect(): Observable<void> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }

  // Получение ID сокета
  getSocketId() {
    return this.socket.id;
  }
}