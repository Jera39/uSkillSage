import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  buttonToLogin(){
this.router.navigate(['/login']);
  }

  buttonToRegister(){
    this.router.navigate(['/register']);
  }

}
