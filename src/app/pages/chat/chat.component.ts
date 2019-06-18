
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Persona } from '../../models/persona.model';


// declare function init_plugins();

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  listaSubscription: Subscription;
  mensajesSubcription: Subscription;
  elemento: HTMLElement;
  texto: '';
  @Input() mensajes: any[] = [];
  @Input() mensaje: any;
  @Input() personas: Persona[] = [];
  @Input() persona: Persona;
  @Input() hora: string;
  @Input() de: string;

  constructor(

    private activatedRoute: ActivatedRoute,
    public chatService: ChatService,
    ) {  }

  ngOnInit() {
    this.activatedRoute.queryParams
                  .subscribe( queryParams => {
                  const persona = new Persona ('', queryParams.nombre, queryParams.sala );
                  this.persona = persona;
                  // console.log('ngoninitchatcomponente1', persona);
                  });
    // console.log('ngoninitchatcomponente', this.persona);
    this.chatService.entrarChat(this.persona, (personas) => {
      // personas = personas;
      this.personas = personas;
      console.log('sdfsd', personas);
    });

    this.elemento = document.getElementById('chat-mensajes');
    this.listaSubscription = this.chatService.getlistaPersona().subscribe( (personas: Persona[]) => {
    this.personas = personas;
    });

    this.mensajesSubcription = this.chatService.getMessages().subscribe( msg => {
      this.mensajes.push(msg);
       setTimeout(  () => {
       this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  ngOnDestroy() {
    this.mensajesSubcription.unsubscribe();
    this.listaSubscription.unsubscribe();
    this.chatService.diconnect(this.persona);
  }


  enviar() {
    if ( this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.texto, this.persona, (callback) => {

      const fecha = new Date(callback.mensaje.fecha);
      const hora: string = fecha.getHours() + ':' + fecha.getMinutes();
      // this.mensaje.de = callback.persona; // es la persona que manda el mensaje
      // this.mensaje.a = callback.persona.sala;
      // this.mensaje.nombre = callback.mensaje;
      this.de = callback.nombre;
      this.mensaje = callback.mensaje;
      this.hora = callback.fecha;
      console.log('éntro', callback.nombre, callback.mensaje, callback.fecha);
    });
    this.texto = '';
  }

  SendPrivMessage() {
    if ( this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendPrivMessage(this.texto, this.persona);
    this.texto = '';
  }

  listaPersona() {
  // this.chatService.getlistaPersona();
      return this.chatService.getlistaPersona();
    }
  }
