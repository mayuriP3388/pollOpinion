import { Component, OnInit } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  constructor(public pollservice: PollserviceService) { }

  ngOnInit() {
    var userObject = localStorage.getItem('userObject');
    let record;
    if(userObject != undefined || userObject != null){
      record = JSON.parse(userObject);
      this.pollservice.userType = record.user['role'];
      console.log("record",record)
    }
    console.log("userObject",userObject)

    this.getAllPolls();
  }
  getAllPolls(){

    let url ='/getAllPolls/2';
    this.pollservice.getApi(url).subscribe(response =>{
      response = {
       "sessionId": "c35c71fc-0bcc-425a-9f21-f6c874f6ed25",
      "user": {
          "userId": 2,
          "name": "diya",
          "email": "diya@gmail.com",
          "role": "admin",
          "createdAt": "2022-11-18T09:21:00.000+00:00"
        }}
        localStorage.setItem("userObject",JSON.stringify(response));
      },
    error =>{

    });
  }

}
