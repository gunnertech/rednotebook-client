import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

import { TabsPage } from '../tabs/tabs';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-secret-token',
  templateUrl: 'secret-token.html'
})
export class SecretTokenPage {

	secretToken: string;

  constructor(public authService: Auth, public navCtrl: NavController) {}

  saveToken() {
  	this.authService.setSecretToken(this.secretToken);

  	this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('Hello SecretTokenPage Page');
  }

}
