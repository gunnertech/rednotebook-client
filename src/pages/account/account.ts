import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { StateService } from '../../providers/state.service';
import { State } from '../../models/state.model';

import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

	user: User;
	states: State[];
	view: String;
  months: string[];

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private stateService: StateService) {
  	this.user = new User();
  	this.user.local = {};
    this.user.billingInfo = {};
  	this.view = "credentials";
    this.months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemter'];
  }

  ionViewDidLoad() {

    Observable.forkJoin(
      this.userService.get(),
      this.stateService.query()
    )
    .subscribe(
      (data) => {
        this.user = data[0];
        this.states = data[1];
        this.user.state = this.user.states[0];

        if(!this.user.hasValidSubscription) {
          this.showAlert();
        }
    	}
    )
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Your Account has Expired',
      subTitle: 'In order to access your account, you need to update your subsribtion. Rednotebook is only $.99 per month.' ,
      buttons: ['OK']
    });
    this.view = 'subscription';
    alert.present();
  }

}
