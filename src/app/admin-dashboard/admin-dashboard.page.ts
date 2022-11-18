import { Component, OnInit } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  showtab =true;
  userName ="";
  constructor(public pollservice: PollserviceService) { }

  ngOnInit() {
    var userObject = localStorage.getItem('userObject');
    let record;
    if(userObject != undefined || userObject != null){
      record = JSON.parse(userObject);
      this.pollservice.userType = record;
      this.showtab =  record.user['role']== 'admin' ? true: true;
      this.userName =  record.user['name'];
      console.log("record",record)
    }
    console.log("userObject",userObject)

    this.getAllPolls();
  }
  getAllPolls(){
    let userid= this.pollservice.userType.user.userId;
    let url ='/getAllPolls/'+userid;
    this.pollservice.getApi(url).subscribe(response =>{
     
       console.log("respone poll",response);
       var res ={
        "publishedPolls": [
            {
                "poll": {
                    "pollId": 1,
                    "userId": 1,
                    "question": "your favourite song",
                    "createdAt": "2022-11-18T16:01:07.000+00:00",
                    "published": true
                },
                "pollAnswers": [
                    {
                        "pollAnswerId": 1,
                        "pollId": 1,
                        "optionName": "dil chahat hai",
                        "votes": 0
                    },
                    {
                        "pollAnswerId": 2,
                        "pollId": 1,
                        "optionName": "kabhi kabhi",
                        "votes": 1
                    },
                    {
                        "pollAnswerId": 3,
                        "pollId": 1,
                        "optionName": "kal ho naa ho",
                        "votes": 0
                    }
                ]
            },
            {
                "poll": {
                    "pollId": 2,
                    "userId": 2,
                    "question": "your favourite colour",
                    "createdAt": "2022-11-18T16:06:16.000+00:00",
                    "published": true
                },
                "pollAnswers": [
                    {
                        "pollAnswerId": 4,
                        "pollId": 2,
                        "optionName": "red",
                        "votes": 0
                    },
                    {
                        "pollAnswerId": 5,
                        "pollId": 2,
                        "optionName": "yellow",
                        "votes": 1
                    },
                    {
                        "pollAnswerId": 6,
                        "pollId": 2,
                        "optionName": "black",
                        "votes": 0
                    }
                ]
            }
        ],
        "unplishedPolls": null
    }
      },
    error =>{

    });
  }

}
