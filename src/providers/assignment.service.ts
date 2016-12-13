import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Assignment } from '../models/assignment.model';


@Injectable()
export class AssignmentService {

  constructor(public http: Http) {
    
  }

  load(): Observable<Assignment[]> {
      return this.http.get('/api/assignment')
        .map(res => <Assignment[]>res.json());
    }

}
