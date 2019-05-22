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
    nombre: this.params.get('nombre'),
    sala: this.params.get('sala')
  };

  divUsuarios = document.getElementById('divUsuarios');
  formEnviar = document.getElementById('formEnviar');
  txtMensaje = document.getElementById('txtMensaje');
  divChatbox = document.getElementById('divChatbox');

  constructor(
    public wsServices: WebsocketService
  ) { }

  entrarChat(usuario: any) {
    const payload = {
      nombre: usuario.nombre,
      sala: usuario.sala
    };
    this.wsServices.emit( 'entrarChat', payload, function( resp ) {
      this.renderizarUsuarios( resp );
    });
  }

  sendMessage( mensaje: string ) {
    const payload = {
      de: 'Fernando',
      cuerpo: mensaje
    };
    this.wsServices.emit( 'crearMensaje', payload, function( mensaje1: string ) {
      this.renderizarMensajes(mensaje1);
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
  listaPersona( personas: any) {
    this.renderizarUsuarios(personas);
  }

  // Funciones para renderizar usuarios
  renderizarUsuarios(personas) {
    console.log(personas);

    let html = '';
    html += `<li>`;
    html += `   <a href = "javascript:void(0)" class = "active" > Chat de <span> ${ this.params.get('sala')} </span></a> `;
    html += `</li>`;
    for (let i = 0; i < personas.length; i++) {
        html += `<li>`;
        // tslint:disable-next-line:max-line-length
        html += `<a data-id= "${personas[i].id}" href="javascript:void(0)"><img src="../assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${personas[i].nombre} <small class="text-success">online</small></span></a>`;
        html += `</li>`;
      }
    this.divUsuarios.innerHTML = html;
  }

  renderizarMensajes( mensaje, yo ) {
    let html = '';
    const fecha = new Date(mensaje.fecha);
    const hora = fecha.getHours() + ':' + fecha.getMinutes();

    let adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }
    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '   <div class="chat-content">';
        html += '       <h5>' + mensaje.nombre + '</h5>';
        html += '       <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '   </div>';
        html += '   <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }
    this.divChatbox.innerHTML = html;

  }

}
