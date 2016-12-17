import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { Part } from '../models/part.model';


@Injectable()
export class PartService {

  constructor(public http: Http, private storage: Storage) { }

  private buildHeaders(): Promise<Headers> {
  	return this.storage.get('token')
	  	.then((value) => {

	  		let headers = new Headers();
	  		headers.append('Authorization', value);

	  		return headers;
	  	})
  }

  private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  get(partId): Observable<Part> {

  	return Observable
			.fromPromise(this.buildHeaders())
  		.switchMap((headers) => this.http.get(`/api/part/${partId}`, { headers: headers }))
  		.map(res => <Part>res.json())
  		.catch(this.handleError);
  }

  save(part: Part): Observable<Part> {
    let url = part._id ? `/api/part/${part._id}` : '/api/part';

  	return Observable
			.fromPromise(this.buildHeaders())
  		.switchMap((headers) => (part._id ? this.http.put(url, part, { headers: headers }) : this.http.post(url, part, { headers: headers })))
  		.map(res => <Part>res.json())
  		.catch(this.handleError);

  }
}