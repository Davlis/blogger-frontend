import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from '../services/auth.service';

export const env = {
  api_url: 'http://localhost:3000',
}

export const methodNames = [
  'get',
  'post',
  'put',
  'patch',
  'delete'
]

@Injectable()
export class DataService {
  
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': ''
  });

  constructor(private http: Http, private auth: AuthService) {
  }

  public callHandler(method: string, endpoint: string, options?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {

      let params: any = {};

      if (!method) {
        return Promise.reject('First param cannot be undefined')
      }

      method = method.toLowerCase();

      if (methodNames.indexOf(method) === -1) {
        return Promise.reject('Wrong method name');
      }

      if (method === 'post' || method === 'patch' || method === 'put') {
        if (!options || !options.data) {
          return Promise
          .reject('You need to provide data if you want to make '+method.toUpperCase()+' request');
        }

        params.data = options.data;
      }


      let url = `${env.api_url}/${endpoint}`;

      if (options && options.query) {
        url += this.getQuery(options.query);
      }

      params.url = url;

      this.headers.set('Authorization', this.auth.getAuthHeader());

      try { 
        resolve(await this[method](params));
      } catch(err) {
        reject(err);
      }

    });
  }

  private get({ url }): Promise<any> {
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(err => {
        return this.handleError(err);
      });
  }

  private post({ url, data }): Promise<any> {
    return this.http
      .post(url, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(err => {
        return this.handleError(err);
      });
  }

  private delete({ url }): Promise<any> {
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => {
        return null;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  private put({ url, data }): Promise<any> {
    return this.http
      .put(url, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(err => {
        return this.handleError(err);
      });
  }

  private patch({ url , data }): Promise<any> {
    this.headers.set('Authorization', this.auth.getAuthHeader());

    return this.http
      .patch(url, JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(err => {
        return this.handleError(err);
      });
  }

  getObservableDataQuery(endpoint: string, query: any) {
    let url = `${env.api_url}/${endpoint}`;
    url += this.getQuery(query);
    this.headers.set('Authorization', this.auth.getAuthHeader());

    return this.http
      .get(url, { headers: this.headers })
      .map(response => {
        return response.json() as any[];
      }).catch(err => {
        this.handleError(err);
        return Observable.of([]);
      });
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error);
  }

  private getQuery(query) {
    let q = '?';
    for(let key in query) {
      if(query.hasOwnProperty(key)) {
        q += key + '=' + query[key] + '&';
      }
    }

    q = q.substr(0, q.length - 1);

    return q;
  }

}
