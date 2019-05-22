import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
ingreso: string;

constructor(
    public router: Router
    ) { }

  ngOnInit() {
    init_plugins();

  }
  ingresar(forma: NgForm) {
    if ( forma.invalid) {
      return;
    }
// const usuario = {
//        name: forma.value.name,
//        sala: forma.value.sala
//      };
   this.router.navigate(['/chat'], { queryParams: { nombre: forma.value.name, sala: forma.value.sala } });

  }
}
