// ***  YO SOY EL CLIENTE QUERIENDO ENVIAR Y RECIBIR EVENTOS! ***//


// **** FRONTEND /- Servicio de chat / metodos /*****/


import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  params = new URLSearchParams(window.location.search);

  usuario = {
    name: this.params.get('name'),
    sala: this.params.get('sala')
  };

  constructor(
    public wsServices: WebsocketService,
    ) { }

  entrarChat(usuario: any) {
    const payload = {
      nombre: usuario.nombre,
      sala: usuario.sala
    };
    this.wsServices.emit( 'entrarChat', payload, function( resp ) {
      console.log('chatserviceemitentrarchat', resp ); // Deberia devolver lista de usuarios en esa sala
      this.chatComponent.renderizarUsuarios( resp ); // resp = lista de usuarios
    });
  }

  sendMessage( mensaje: string ) {
    const payload = {
      de: 'Fernando',
      cuerpo: mensaje
    };
    this.wsServices.emit( 'crearMensaje', payload, function( mensaje1: string ) {
      this.chatComponent.renderizarMensajes(mensaje1);
      this.scrollBottom();
      });
  }
  getMessages() {
    return this.wsServices.listen( 'mensaje-nuevo');
  }
  sendPrivMessage(mensaje: string, data: any) {
    const payload = {
      mensaje: mensaje,
      para: data.sala
    };
    this.wsServices.emit( 'mensajePrivado', payload );
  }

  // listaPersona( personas: any) {
  //   renderizarUsuarios( personas );
  // }

}
