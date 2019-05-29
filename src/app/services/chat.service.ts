// ***  YO SOY EL CLIENTE QUERIENDO ENVIAR Y RECIBIR EVENTOS! ***//


// **** FRONTEND /- Servicio de chat / metodos /*****/


import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { RendService } from './rend.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  // elemento: HTMLElement;
  mensajes: any[] = [];


  constructor(
    public wsServices: WebsocketService,
    public rendService: RendService
    ) { }

    entrarChat(usuario: any) {
    const payload = {
      nombre: usuario.nombre,
      sala: usuario.sala
    };
    this.wsServices.emit( 'entrarChat', payload, function( callback: any ) {
      console.log('chatserviceemitentrarchat', callback ); // Deberia devolver lista de usuarios en esa sala
    });
    this.rendService.renderizarUsuarios( payload );  // resp = lista de usuarios
  }

  sendMessage( mensaje: string ) {
    const payload = {
      de: 'Fernando',
      cuerpo: mensaje
    };
    this.wsServices.emit( 'crearMensaje', payload, function( mensaje1: string ) {
      this.rendService.renderizarMensajes(mensaje1);
      this.rendService.scrollBottom();
      });
  }
  getMessages() {
    return this.wsServices.listen( 'mensaje-nuevo');
  }
  getMessagesPrivate() {
    return this.wsServices.listen( 'mensaje-privado');
  }
  sendPrivMessage(mensaje: string, data: any) {
    const payload = {
      mensaje: mensaje,
      para: data.sala
    };
    this.wsServices.emit( 'mensajePrivado', payload );
  }
}
  // listaPersona( personas: any) {
  //   renderizarUsuarios( personas );
  // }
  // Funciones para renderizar usuarios
