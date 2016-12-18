import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Input } from '../../models/input.model';
import { InputService } from '../../providers/input.service';

import { Section } from '../../models/section.model';
import { SectionService } from '../../providers/section.service';


@Component({
  selector: 'page-input-edit',
  templateUrl: 'input-edit.html'
})
export class InputEditPage {

	section: Section;
	errorMessage: string;
	input: Input;

  constructor(private navController: NavController, private navParams: NavParams, private inputService: InputService, private sectionService: SectionService) {
  	this.input = new Input();
    this.section = new Section();
    this.input.sectionId = this.navParams.get('sectionId');
  }

  ionViewDidLoad() {
    let inputId = this.navParams.get('inputId');

    if(inputId) {
      this.inputService.get(inputId)
        .subscribe(
          input => this.input = input,
          error =>  this.errorMessage = <any>error
        );      
    }

    this.sectionService.get(this.input.sectionId)
      .subscribe(
        (section) => {
          this.section = section;
          if(!inputId) {
            this.input.position = section.inputs.length + 1;
          }
        },
        error =>  this.errorMessage = <any>error
      );      
  }

  saveInput() {
    console.log('saving')
  	this.input.section = this.input.sectionId;
  	this.inputService.save(this.input)
	  	.subscribe(
	  		input => this.navController.pop(),
	  	  error =>  this.errorMessage = <any>error
	  	);
  }

}
