// ***  YO SOY EL CLIENTE QUERIENDO ENVIAR Y RECIBIR EVENTOS! ***//


// **** FRONTEND /- Servicio de chat / metodos /*****/


import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
// import { RendService } from './rend.service';
import { Persona } from '../models/persona.model';


@Injectable({
  providedIn: 'root'
})

export class ChatService {
mensaje: any;
persona: Persona;
  constructor(
    public wsServices: WebsocketService,

    ) { }

    entrarChat(persona: Persona, callback: any) {
      const payload = {
        nombre: persona.nombre,
        sala: persona.sala
      };
      console.log('per', persona);
      this.wsServices.emit('entrarChat', payload, (personas: Persona) => {
      console.log('cahtserv', personas);
        callback(personas);
      // console.log('personas en sala', callback.personas); // personas en la sala
    });
  }
  sendMessage( mensaje: any, persona: Persona, callback1: any ) {
    const payload = {
      persona: persona,
      mensaje: mensaje
    };

      this.wsServices.emit('crearMensaje', payload, (mensaje1: any, persona1: Persona ) => {
       //  this.rendService.scrollBottom();
      callback1(mensaje1, persona1);
    console.log('chatserv.el.callback1', callback1.nombre, callback1.mensaje  );
    console.log('chatserv.el.callback', mensaje1, persona1);
     // callback1.mensaje = mensaje1;
     // callback1.persona = persona1;

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
