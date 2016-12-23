import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { User } from '../models/user.model';


@Injectable()
export class UserService {

  constructor(public http: Http, private storage: Storage) { }

  private buildHeaders(): Promise<Headers> {
    let headers = new Headers();
    
  	return this.storage.get('token')
	  	.then((value) => {
        headers.append('Authorization', value);
        return this.storage.get('secretToken')
	  	})
      .then((value) => {
        headers.append('EncryptionKey', value);
        return headers;
      });
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

  get(): Observable<User> {

  	return Observable
			.fromPromise(this.buildHeaders())
  		.switchMap((headers) => this.http.get('/api/auth/user', { headers: headers }))
  		.map(res => <User>res.json())
  		.catch(this.handleError);
  }

}
