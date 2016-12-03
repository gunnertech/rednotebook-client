import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  login() {
   
		this.showLoader();

    let credentials = {
	    username: this.email,
	    password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
   
   }
   
    launchSignup() {
			this.navCtrl.push(SignupPage);
    }
   
    showLoader() {
   
      this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
      });
   
	    this.loading.present();
   
    }

}
