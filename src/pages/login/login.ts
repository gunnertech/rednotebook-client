import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { SecretTokenPage } from '../secret-token/secret-token';

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

    this.authService.login(credentials)
    .then((result) => {
      this.loading.dismiss();
      this.authService.checkSecretToken()
      .then((res) => {
        if(res) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.navCtrl.setRoot(SecretTokenPage);
        }
      }, (err) => {
        this.navCtrl.setRoot(SecretTokenPage);
      });
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
