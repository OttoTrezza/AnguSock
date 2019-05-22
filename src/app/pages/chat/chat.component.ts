import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {

  texto: '';

  mensajesSubcription: Subscription;

  mensajes: any[] = [];

  params = new URLSearchParams(window.location.search);

  usuario = {
    nombre: this.params.get('nombre'),
    sala: this.params.get('sala')
  };


  // divUsuarios = document.getElementById('divUsuarios');
  // formEnviar = document.getElementById('formEnviar');
  // txtMensaje = document.getElementById('txtMensaje');
  // divChatbox = document.getElementById('divChatbox');
  constructor(
    public chatService: ChatService
    ) {  }

  ngOnInit() {
    console.log(this.usuario);
    this.chatService.entrarChat( this.usuario);
   // this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubcription = this.chatService.getMessages().subscribe( msg => {
      this.mensajes.push(msg);
  //    setTimeout(  () => {
  //      this.elemento.scrollTop = this.elemento.scrollHeight;
  //    }, 50);
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

}
