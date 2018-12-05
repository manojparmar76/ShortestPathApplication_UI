import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { CONSTANT } from './../constant/constant';

@Injectable()
export class ApiService {

  public static errorEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  private handleError(error: Error, type: string, url: string) {
    const errorObj = { error: error, type: type, url: url };
    console.log(errorObj);
    alert('Error : ' + 'Something went wrong with API');
    ApiService.errorEvent.emit(errorObj);
  }

  public getCallback(url: string): Observable<any> {
    const finalUrl = CONSTANT.hostURL + url;
    const httpHeaders = new HttpHeaders(CONSTANT.headers);

    return this.http.get(finalUrl, { headers: httpHeaders })
      .pipe(
        tap(
          response => {
            return response;
          },
          error => {
            this.handleError(error, 'GET', finalUrl);
          }
        )
      );
  }

  public postCallback(url: string, body?: Object): Observable<any> {
    const finalUrl = CONSTANT.hostURL + url;
    if (!body) {
      body = {};
    }
    const httpHeaders = new HttpHeaders(CONSTANT.headers);

    return this.http.post(finalUrl, body, { headers: httpHeaders })
      .pipe(
        tap(
          response => {
            return response;
          },
          error => {
            this.handleError(error, 'POST', finalUrl);
          }
        )
      );
  }

}
