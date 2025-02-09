import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  generoNarrativo: string = ''
  imagenFondo: string = ''

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  backHome(){
    this.navCtrl.back();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['generoNarrativo']) {
      this.imagenFondo = this.fondo();
    }
  }

  claseFondo() {
    switch (this.generoNarrativo) {
      case 'fantasy':
        return 'fondo-fantasy';
      case 'sci-fi':
        return 'fondo-sci-fi';
      case 'mitology':
        return 'fondo-mitology';
      default:
        return 'fondo-default';
    }
  }

  fondo() {
    switch (this.generoNarrativo) {
      case 'fantasy':
        return 'https://i.postimg.cc/NfNjH6Jh/fantasy-6835790.jpg';
      case 'sci-fi':
        return 'https://i.postimg.cc/90CQGJH2/ai-generated-8548276.jpg';
      case 'mitology':
        return 'https://i.postimg.cc/8km51QLz/dragon-9017341-1920.png';
      default:
        return 'https://i.postimg.cc/d3xgqVBf/warrior-7795480.jpg';
    }
  }

}
