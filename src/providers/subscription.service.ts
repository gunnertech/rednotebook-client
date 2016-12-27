import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Subscription } from '../models/subscription.model';


@Injectable()
export class SubscriptionService {

  constructor(public http: Http, private storage: Storage) { }

  private buildHeaders(): Promise<Headers> {
  	return this.storage.get('token')
	  	.then((value) => {

	  		let headers = new Headers();
	  		headers.append('Authorization', value);
        headers.append('Content-Type', 'application/json');

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

  get(subscriptionId: string): Observable<Subscription> {

    return Observable
      .fromPromise(this.buildHeaders())
      .switchMap((headers) => this.http.get(`http://localhost:8080/api/subscription/${subscriptionId}`, { headers: headers }))
      .map(res => <Subscription>res.json())
      .catch(this.handleError);
  }

  save(subscription: Subscription): Observable<Subscription> {

    let url = 'http://localhost:8080/api/subscription';

  	return Observable
			.fromPromise(this.buildHeaders())
  		.switchMap((headers) => this.http.post(url, subscription, { headers: headers }))
  		.map(res => <Subscription>res.json())
  		.catch(this.handleError);

  }

  delete(subscription: Subscription | any): Observable<any> {

    return Observable
      .fromPromise(this.buildHeaders())
      .switchMap((headers) => this.http.delete(`http://localhost:8080/api/subscription/${(subscription._id || subscription)}`, { headers: headers }) )
      .map(res => <any>res.json())
      .catch(this.handleError);

  }

}
