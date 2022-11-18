import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollserviceService {
  baseURl ='https://3d14-111-119-221-170.in.ngrok.io';
  constructor(private http: HttpClient) { }

  postApi(url:any,param:any){
    let finalURL = this.baseURl+url;
    return this.http.post(finalURL, param)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a todo" + error.message);
      }));
  }

  getApi(url:any,param:any){
    return this.http.get(url, param)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a todo" + error.message);
      }));
  }
}
