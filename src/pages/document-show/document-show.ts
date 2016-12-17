import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Part } from '../../models/part.model';
import { PartService } from '../../providers/part.service';

import { SectionService } from '../../providers/section.service';

import { Document } from '../../models/document.model';
import { DocumentService } from '../../providers/document.service';

import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';

import { Assignment } from '../../models/assignment.model';
import { AssignmentService } from '../../providers/assignment.service';

import { DocumentEditPage } from '../document-edit/document-edit';
import { SectionNewPage } from '../section-new/section-new';
import { InputEditPage } from '../input-edit/input-edit';

import _ from "lodash";


@Component({
  selector: 'page-document-show',
  templateUrl: 'document-show.html'
})
export class DocumentShowPage {

	document: Document;
	errorMessage: string;
  user: User;
  assignment: Assignment;

  constructor(private navCtrl: NavController, private navParams: NavParams, private partService: PartService, private documentService: DocumentService, private alertCtrl: AlertController, private sectionService: SectionService, private userService: UserService, private assignmentService: AssignmentService) {
  	this.document = new Document();
    this.user = new User();
    this.assignment = new Assignment();
    this.document._id = this.navParams.get('documentId');
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.fetchDocument();
    this.fetchUser();
  }

  fetchUser() {
    this.userService.get()
      .subscribe(
        (user) => {
          this.user = user;
          this.assignment = _.find(this.user.assignments, (assignment) => { return assignment.document == this.document._id; })
          console.log(this.assignment);
          console.log(user);
        },
        error =>  this.errorMessage = <any>error
      );
  }

  fetchDocument() {
    this.documentService.get(this.navParams.get('documentId'))
      .subscribe(
        document => this.document = document,
        error =>  this.errorMessage = <any>error
      );
  }

  loadEditDocument() {
    this.navCtrl.push(DocumentEditPage, {
      documentId: this.document._id
    })
  }

  loadEditSection(sectionId) {
    this.navCtrl.push(SectionNewPage, {
      sectionId: sectionId
    })
  }

  loadSectionNew(documentId: string) {
    this.navCtrl.push(SectionNewPage, {
      documentId: this.document._id
    }) 
  }

  loadInputEdit(sectionId: String) {
    this.navCtrl.push(InputEditPage, {
      sectionId: sectionId
    }) 
  }

  saveAssignment() {
    this.assignment.completedAt = this.assignment.completedAt ? null : new Date();
    this.assignmentService.save(this.assignment)
      .subscribe(
        assignment => console.log(assignment),
        error =>  this.errorMessage = <any>error
      );
  }

  sendNotification() {
    this.document.sendNotification = true;
    this.documentService.save(this.document)
      .subscribe(
        res => this.presentNotificationAlert(),
        error =>  this.errorMessage = <any>error
      );
  }

  presentNotificationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Notification Sent!',
      subTitle: 'Your notification was sent.',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  removeDocument() {
  	let confirm = this.alertCtrl.create({
      title: 'Delete this document?',
      message: 'Are you sure? There is no undo.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.documentService.delete(this.document)
              .subscribe(
              	res => this.navCtrl.pop(),
                error =>  this.errorMessage = <any>error
              );	
          }
        }
      ]
    });
    confirm.present();

  }

  removeSection(sectionId: String) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this section?',
      message: 'Are you sure? This will also delete all inputs associated with this section. There is no undo.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.sectionService.delete(sectionId)
              .subscribe(
                res => this.fetchDocument(),
                error =>  this.errorMessage = <any>error
              );  
          }
        }
      ]
    });
    confirm.present();

  }

}
