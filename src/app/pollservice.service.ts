import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollserviceService {
  userType: string ='';
  baseURl ='http://hacathanprafulla-env.eba-kgp8wwme.ap-south-1.elasticbeanstalk.com:80';
  constructor(private http: HttpClient) { }

  postApi(url:any,param:any){
    var userObject =localStorage.getItem('userObject');
    let auth;
    if(userObject != undefined || userObject != null ){
      let record = JSON.parse(userObject);
       auth = {
        tokenId: record.sessionId,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
    }
   
    let finalURL = this.baseURl+url;
    return this.http.post(finalURL, param, { headers: new HttpHeaders(auth) })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a todo" + error.message);
      }));
  }

  getApi(url:any){
    let finalURL = this.baseURl+url;
    var userObject =localStorage.getItem('userObject');
    let auth;
    if(userObject != undefined || userObject != null ){
      let record = JSON.parse(userObject);
       auth = {
        token: record.sessionId,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
    }
    
    return this.http.get(finalURL,{
      headers: auth})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a todo" + error.message);
      }));
  }
} 
