import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  alogin(forma: NgForm) {
// const usuario = {
//        name: forma.value.name,
//        sala: forma.value.sala
//      };
   this.router.navigate(['/login'] );

  }
}
