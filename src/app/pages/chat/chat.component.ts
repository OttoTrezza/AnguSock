
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {

  texto: '';
  nombre: '';
  sala: '';
  mensajesSubcription: Subscription;
  elemento: HTMLElement;
  mensajes: any[] = [];

  // params = new URLSearchParams(window.location.search);

  divUsuarios = document.getElementById('divUsuarios');
  formEnviar = document.getElementById('formEnviar');
  txtMensaje = document.getElementById('txtMensaje');
  divChatbox = document.getElementById('divChatbox');
  constructor(
    private activatedRoute: ActivatedRoute,
    public chatService: ChatService
    ) {  }
      usuario = {
      nombre: '',
      sala: ''
    };
  ngOnInit() {
    this.activatedRoute.queryParams
                  .subscribe( queryParams => {
                console.log(queryParams);
                this.nombre = queryParams.nombre;
                this.sala = queryParams.sala;
              });
    console.log('ngoninitchatcomponente', this.nombre);
    console.log('ngoninitchatcomponente', this.sala);
        this.usuario.nombre = this.nombre;
        this.usuario.sala = this.sala;

    this.chatService.entrarChat(this.usuario);
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubcription = this.chatService.getMessages().subscribe( msg => {
      this.mensajes.push(msg);
     setTimeout(  () => {
       this.elemento.scrollTop = this.elemento.scrollHeight;
     }, 50);
    });

  }

  ngOnDestroy() {
    this.mensajesSubcription.unsubscribe();
  }

  enviar() {
    if ( this.texto.trim().length === 0) {
      return;
    }
  this.chatService.sendMessage(this.texto);
  this.texto = '';
  }

  SendPrivMessage() {
    if ( this.texto.trim().length === 0) {
      return;
    }
  this.chatService.sendPrivMessage(this.texto, this.usuario);
  this.texto = '';
  }


  // Funciones para renderizar usuarios
    renderizarUsuarios( personas: any) {
    console.log('renderizarusuariospersonas', personas);

    let html = '';
    html += `<li>`;
    html += `   <a href = "javascript:void(0)" class = "active" > Chat de <span> ${ this.usuario.sala} </span></a> `;
    html += `</li>`;
    for (let i = 0; i < personas.length; i++) {
        html += `<li>`;
        // tslint:disable-next-line:max-line-length
        html += `<a data-id= "${personas[i].id}" href="javascript:void(0)"><img src="../../../assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${personas[i].nombre} <small class="text-success">online</small></span></a>`;
        html += `</li>`;
      }
    this.divUsuarios.innerHTML = html;
  }

  renderizarMensajes( mensaje: any, yo: any ) {
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
        html += '    <div class="chat-img"><img src="../../../assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '   <div class="chat-img"><img src="../../../assets/images/users/1.jpg" alt="user" /></div>';
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
