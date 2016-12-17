import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';

import { NotebookService } from '../../providers/notebook.service';
import { Notebook } from '../../models/notebook.model';

import { DocumentNewPage } from '../document-new/document-new';
import { DocumentShowPage } from '../document-show/document-show';
import { PartNewPage } from '../part-new/part-new';
import { PartEditPage } from '../part-edit/part-edit';
import { NotificationIndexPage }  from '../notification-index/notification-index';

import _ from "lodash";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	user: User;
	notebook: Notebook;
  errorMessage: string;
  assignmentCount: number;
  completedAssignmentCount: number;
  unopenedNotificationCount: number;

  constructor(public navCtrl: NavController, private userService: UserService, public notebookService: NotebookService) {
    this.user = new User();
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    this.notebookService.get()
      .subscribe(
        notebook => this.notebook = notebook,
        error =>  this.errorMessage = <any>error
      );

    this.userService.get()
      .subscribe(
        (user) => { this.updateUser(user); },
        error =>  this.errorMessage = <any>error
      );
  }

  updateUser(user: User) {
    this.user = user;
    this.assignmentCount = user.assignments.length;
    this.completedAssignmentCount = _.filter(user.assignments, (assignment) => { return assignment.completedAt != null; } ).length;
    this.unopenedNotificationCount = _.filter(user.notifications, (notification) => { return !notification.openedAt; } ).length;
  }

  loadNewDocument(partId: string) {
  	this.navCtrl.push(DocumentNewPage, {
  		partId: partId
  	});
  }

  loadDocumentShow(documentId: string) {
    this.navCtrl.push(DocumentShowPage, {
      documentId: documentId
    });
  }

  loadNotificationIndex() {
    this.navCtrl.push(NotificationIndexPage);
  }

  loadNewPart(notebookId: string) {
    this.navCtrl.push(PartNewPage, {
      notebookId: notebookId
    })
  }

  loadEditPart(partId: string) {
    this.navCtrl.push(PartEditPage, {
      partId: partId
    }) 
  }

  log(phrase) {
  	console.log(phrase);
  }

}
