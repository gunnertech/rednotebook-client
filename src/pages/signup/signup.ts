import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../providers/auth';
import { ValidationService } from '../../providers/validation.service';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	email: string;
	password: string;
	username: string;
	loading: any;
	user: FormGroup;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  	this.user = this.formBuilder.group({
  	  username: ['', [Validators.required, Validators.minLength(4)]],
  	  email: ['', [Validators.required]],
  	  password: ['', [Validators.required, Validators.minLength(8)]]
  	});
  }

  ionViewDidLoad() {
    
    this.showLoader();

    
     
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
	    console.log("Already authorized");
	    this.loading.dismiss();
	    this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });
  }

  register() {
  	this.showLoader();

  	let details = {
  		email: this.email,
  		password: this.password,
  		username: this.username
  	};

  	this.authService.createAccount(details)
  	.then((result) => {
  		this.loading.dismiss();
  		console.log(result);
  		this.navCtrl.setRoot(TabsPage);

  	}, (err) => {
  		this.loading.dismiss();
  		this.showAlert(err.message);
  	});
  }

  launchLogin() {
		this.navCtrl.push(LoginPage);
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Whooops...',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoader() {
  	this.loading = this.loadingCtrl.create({
  		content: 'Authenticating...'
  	});

  	this.loading.present();
  }

}
