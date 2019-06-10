
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
  mensajesSubcription: Subscription;
  elemento: HTMLElement;
  texto: '';
  @Input() mensajes: any[] = [];
  @Input() mensaje: any;
  @Input() personas: Persona[] = [];
  @Input() persona: Persona;
  @Input() hora: string;

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
    this.mensajesSubcription = this.chatService.getMessages().subscribe( msg => {
      this.mensajes.push(msg);
       setTimeout(  () => {
       this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  // renderizarUsuarios( personas: any ) {
  //   this.personas = personas;
  //   //   console.log('renderizarusuariospersonas', personas);
  // }

  ngOnDestroy() {
    this.mensajesSubcription.unsubscribe();
  }


  enviar() {
    if ( this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.texto, this.persona, (mensaje: any, persona: Persona) => {

      const fecha = new Date(mensaje.fecha);
      const hora: string = fecha.getHours() + ':' + fecha.getMinutes();
      this.mensaje.de = mensaje.nombre; // es la persona que manda el mensaje
      this.mensaje.a = persona.sala;
      this.mensaje.mensaje = mensaje.mensaje;
      this.hora = hora;
      console.log('éntro', persona.nombre, mensaje, mensaje.de, mensaje.a, hora);
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
}
