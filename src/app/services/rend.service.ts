// **// FRONTEND /- Servicio de Sockets//*****//

import { Injectable, Input } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class RendService {

    // elemento: HTMLElement;
  mensajes: any[] = [];
  mensaje: any;

  divUsuarios = document.getElementById('divUsuarios');
  formEnviar = document.getElementById('formEnviar');
  txtMensaje = document.getElementById('txtMensaje');
  divChatbox = document.getElementById('divChatbox');



  constructor(  ) { }

    // renderizarUsuarios( personas: any ) {
    //   console.log('renderizarusuariospersonas', personas);

    //   // let html = '';
    //   let html = `<li>`;
    //   html += `   <a href = "javascript:void(0)" class = "active" > Chat de <span> ${ personas.sala} </span></a> `;
    //   html += `</li>`;
    //   for (let i = 0; i < personas.length; i++) {
    //       html += `<li>`;
    //       // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //       html += `<a data-id= "${personas[i].id}" href="javascript:void(0)"><img src="../../../assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${personas[i].nombre} <small class="text-success">online</small></span></a>`;
    //       html += `</li>`;
    //     }
    //    //  this.divUsuarios.innerHTML = html;

    // }

    // renderizarMensajes( mensaje: any, yo: any ) {
    //   // let html = '';
    //   const fecha = new Date(mensaje.fecha);
    //   let this.hora = fecha.getHours() + ':' + fecha.getMinutes();

    //   // let adminClass = 'info';
    //   // if (mensaje.nombre === 'Administrador') {
    //   //     adminClass = 'danger';
    //   // }
    //   // if (yo) {
    //   //     html += '<li class="reverse">';
    //   //     html += '    <div class="chat-content">';
    //   //     html += '        <h5>' + mensaje.nombre + '</h5>';
    //   //     html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
    //   //     html += '    </div>';
    //   //     html += '    <div class="chat-img"><img src="../../../assets/images/users/5.jpg" alt="user" /></div>';
    //   //     html += '    <div class="chat-time">' + hora + '</div>';
    //   //     html += '</li>';

    //   // } else {
    //   //     html += '<li class="animated fadeIn">';
    //   //     if (mensaje.nombre !== 'Administrador') {
    //   //         html += '   <div class="chat-img"><img src="../../../assets/images/users/1.jpg" alt="user" /></div>';
    //   //     }
    //   //     html += '   <div class="chat-content">';
    //   //     html += '       <h5>' + mensaje.nombre + '</h5>';
    //   //     html += '       <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
    //   //     html += '   </div>';
    //   //     html += '   <div class="chat-time">' + hora + '</div>';
    //   //     html += '</li>';
    //   // }
    //  // this.divChatbox.innerHTML = html;
    // }

    // scrollBottom() {

    //   // selectors
    //   const newMessage = this.divChatbox.children('li:last-child');

    //   // heightsprop('clientHeight');
    //   const clientHeight = this.divChatbox.prop"clientHeigt";
    //   const scrollTop = this.divChatbox.prop('scrollTop');
    //   const scrollHeight = this.divChatbox.prop('scrollHeight');
    //   const newMessageHeight = newMessage.innerHeight();
    //   const lastMessageHeight = newMessage.prev().innerHeight() || 0;

    //   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //     this.divChatbox.scrollTop(scrollHeight);
    //   }
}
