
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Persona } from '../../models/persona.model';


declare function init_plugins();

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  texto: '';
  nombre: '';
  sala: '';
  mensajesSubcription: Subscription;
  elemento: HTMLElement;
  mensajes: any[] = [];
  personas: Persona[] = [];


  constructor(

    private activatedRoute: ActivatedRoute,
    public chatService: ChatService

    ) {  }
      usuario = {
      nombre: '',
      sala: ''
    };


  ngOnInit() {
    // init_plugins();
    // this.forma = new FormGroup({
    //   busqueda: new FormControl(null),
    // });

    this.activatedRoute.queryParams
                  .subscribe( queryParams => {
                // console.log(queryParams);
                this.nombre = queryParams.nombre;
                this.sala = queryParams.sala;
              });
        this.usuario.nombre = this.nombre;
        this.usuario.sala = this.sala;
        console.log('ngoninitchatcomponente', this.nombre);
        console.log('ngoninitchatcomponente', this.sala);

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
}
