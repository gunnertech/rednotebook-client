import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Part } from '../../models/part.model';
import { PartService } from '../../providers/part.service';

import { State } from '../../models/state.model';
import { StateService } from '../../providers/state.service';

import { Document } from '../../models/document.model';
import { DocumentService } from '../../providers/document.service';


@Component({
  selector: 'page-document-new',
  templateUrl: 'document-new.html'
})
export class DocumentNewPage {

  constructor(private navController: NavController, private navParams: NavParams, private partService: PartService, private stateService: StateService, private documentService: DocumentService) {
  	this.document = new Document();
  	this.document.state = null;
  }

  part: Part;
  states: State[];
  errorMessage: string;
  document: Document;

  ionViewDidLoad() {
    this.partService.get(this.navParams.get('partId'))
      .subscribe(
      	(part) => {this.part = part; this.document.position = (part.documents.length + 1)},
        error =>  this.errorMessage = <any>error
      );

    this.stateService.query()
      .subscribe(
      	states => this.states = states,
        error =>  this.errorMessage = <any>error
      );


  }

  saveDocument() {
  	this.document.part = this.part;
  	this.documentService.save(this.document)
	  	.subscribe(
	  		document => this.navController.pop(),
	  	  error =>  this.errorMessage = <any>error
	  	);
  }

}
