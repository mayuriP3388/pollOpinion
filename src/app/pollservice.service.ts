import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollserviceService {
  userType: any ;
  unpublishList =[];
  baseURl ='http://hacathanprafulla-env.eba-kgp8wwme.ap-south-1.elasticbeanstalk.com:80';
  active_polls:any = 0;

  constructor(private http: HttpClient) { }

  postApi(url:any,param:any){
   
    let finalURL = this.baseURl+url;
    return this.http.post(finalURL, param, {  })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a todo" + error.message);
      }));
  }

  getApi(url:any){
    let finalURL = this.baseURl+url;
    return this.http.get(finalURL,
      {  })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a todo" + error.message);
      }));
  }
} 
