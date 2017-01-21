import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user.service';


@Component({
  selector: 'page-request-password-reset',
  templateUrl: 'request-password-reset.html'
})
export class RequestPasswordResetPage {

  email: string;
  errorMessage: string;

  constructor(private userService: UserService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPasswordResetPage');
  }

  requestResetToken() {
    this.userService.requestResetToken(this.email)
    .subscribe(
      (res) => {
        console.log(res)
      },
      error =>  this.errorMessage = <any>error
    );
  }

}
