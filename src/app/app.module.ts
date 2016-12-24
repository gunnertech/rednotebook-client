///// VENDOR SHIT

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Ng2UploaderModule } from 'ng2-uploader';

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

import { SectionNewPage } from '../pages/section-new/section-new';

import { InputEditPage } from '../pages/input-edit/input-edit';

import { NotificationIndexPage } from '../pages/notification-index/notification-index';



////// SERVICES

import { Auth } from '../providers/auth';
import { StateService } from '../providers/state.service';
import { NotebookService } from '../providers/notebook.service';
import { UserService } from '../providers/user.service';
import { PartService } from '../providers/part.service';
import { DocumentService } from '../providers/document.service';
import { SectionService } from '../providers/section.service';
import { InputService } from '../providers/input.service';
import { AssignmentService } from '../providers/assignment.service';
import { NotificationService } from '../providers/notification.service';
import { ResponseService } from '../providers/response.service';
import { FileService } from '../providers/file.service';

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
    PartEditPage,
    SectionNewPage,
    InputEditPage,
    NotificationIndexPage
  ],
  imports: [
    Ng2UploaderModule,
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
    PartEditPage,
    SectionNewPage,
    InputEditPage,
    NotificationIndexPage
  ],
  providers: [
    Auth, 
    Storage, 
    StateService,
    NotebookService,
    UserService,
    PartService,
    DocumentService,
    SectionService,
    InputService,
    AssignmentService,
    NotificationService,
    ResponseService,
    FileService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
