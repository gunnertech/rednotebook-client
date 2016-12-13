import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-secret-token',
  templateUrl: 'secret-token.html'
})
export class SecretTokenPage {

	secretToken: string;

  constructor(public authService: Auth, public navCtrl: NavController) {}

  saveToken() {
  	console.log(this.secretToken);
  	this.authService.setSecretToken(this.secretToken);

  	this.navCtrl.push(TabsPage);
  }

  ionViewDidLoad() {
    console.log('Hello SecretTokenPage Page');
  }

}
