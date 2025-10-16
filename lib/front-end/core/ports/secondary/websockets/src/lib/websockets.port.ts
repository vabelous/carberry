import { Observable } from "rxjs";

export abstract class WebsocketsPort {
  
  // Подключение к сокету
  abstract connect(): void;

  // Отключение от сокета
  abstract disconnect(): void;

  // Отправка сообщения
  abstract sendMessage(message: string, user: string): void;

  // Отправка приватного сообщения
  abstract sendPrivateMessage(to: string, message: string): void;

  // Присоединение к комнате
  abstract joinRoom(room: string): void;

  // Отправка сообщения в комнату
  abstract sendRoomMessage(room: string, message: string): void;

  // Получение новых сообщений
  abstract onNewMessage(): Observable<any>;

  // Получение приватных сообщений
  abstract onPrivateMessage(): Observable<{ from: string; message: string }>;

  // Получение сообщений из комнаты
  abstract onRoomMessage(): Observable<{ from: string; message: string }>;

  // Подключение пользователя
  abstract onUserConnected(): Observable<{ clientId: string }>;

  // Отключение пользователя
  abstract onUserDisconnected(): Observable<{ clientId: string }>;

  // Событие подключения
  abstract onConnect(): Observable<void>;

  // Событие отключения
  abstract onDisconnect(): Observable<void>;

  // Получение ID сокета
  abstract getSocketId(): string | undefined;
}
