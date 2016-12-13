import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

////// PAGES

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SecretTokenPage } from '../pages/secret-token/secret-token';

import { DocumentNewPage } from '../pages/document-new/document-new';
import { DocumentEditPage } from '../pages/document-edit/document-edit';
import { DocumentShowPage } from '../pages/document-show/document-show';

import { PartNewPage } from '../pages/part-new/part-new';
import { PartEditPage } from '../pages/part-edit/part-edit';



////// SERVICES

import { Auth } from '../providers/auth';
import { StateService } from '../providers/state.service';
import { NotebookService } from '../providers/notebook.service';
import { UserService } from '../providers/user.service';
import { PartService } from '../providers/part.service';
import { DocumentService } from '../providers/document.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    SecretTokenPage,
    DocumentNewPage,
    DocumentEditPage,
    DocumentShowPage,
    PartNewPage,
    PartEditPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    SecretTokenPage,
    DocumentNewPage,
    DocumentEditPage,
    DocumentShowPage,
    PartNewPage,
    PartEditPage
  ],
  providers: [
    Auth, 
    Storage, 
    StateService,
    NotebookService,
    UserService,
    PartService,
    DocumentService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
