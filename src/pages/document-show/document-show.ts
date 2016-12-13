import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Part } from '../../models/part.model';
import { PartService } from '../../providers/part.service';

import { Document } from '../../models/document.model';
import { DocumentService } from '../../providers/document.service';

import { DocumentEditPage } from '../document-edit/document-edit';

@Component({
  selector: 'page-document-show',
  templateUrl: 'document-show.html'
})
export class DocumentShowPage {

	document: Document;
	errorMessage: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private partService: PartService, private documentService: DocumentService, private alertCtrl: AlertController) {
  	this.document = new Document()
  }

  ionViewDidLoad() {
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

}
