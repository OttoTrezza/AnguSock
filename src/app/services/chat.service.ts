import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsServices: WebsocketService
  ) { }

  sendMessage(mensaje: string) {
    const payload = {
      de: 'Fernando',
      cuerpo: mensaje
    };
    this.wsServices.emit('mensaje', payload);
  }
  getMessages() {
    return this.wsServices.listen('mensaje-nuevo');
  }
}
