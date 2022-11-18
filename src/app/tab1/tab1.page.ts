import { Component } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  alreadyVoted = false;
  polls:any
  votes:any = [];
  user:any={};
  voted:any=[];
  constructor(public pollserviceService:PollserviceService) {}

  // votes :any
  // totalVotes :any

  ionViewDidEnter(){
    let userObject:any =localStorage.getItem('userObject');
    this.user = JSON.parse(userObject);
    this.votes = [];
  }
  ngOnInit() {

this.polls = [
    {
      question: "Which is better option to make mobile apps?",
      totalVotes: 0,
      options: [
        {
          choice: "Ionic",
          votes: 0,
          color: "primary"
        },
        {
          choice: "Flutter",
          votes: 0,
          color: "success"
        },
        {
          choice: "React Native",
          votes: 0,
          color: "warning"
        },
        {
          choice: "Framework 7",
          votes: 0,
          color: "danger"
        }
      ]
    },
    {
      question: "Which is better option to make mobile apps?",
      totalVotes: 0,
      options: [
        {
          choice: "Ionic",
          votes: 0,
          color: "primary"
        },
        {
          choice: "Flutter",
          votes: 0,
          color: "success"
        },
        {
          choice: "React Native",
          votes: 0,
          color: "warning"
        },
        {
          choice: "Framework 7",
          votes: 0,
          color: "danger"
        }
      ]
    },
    {
      question: "Which is better option to make mobile apps?",
      totalVotes: 0,
      options: [
        {
          choice: "Ionic",
          votes: 0,
          color: "primary"
        },
        {
          choice: "Flutter",
          votes: 0,
          color: "success"
        },
        {
          choice: "React Native",
          votes: 0,
          color: "warning"
        },
        {
          choice: "Framework 7",
          votes: 0,
          color: "danger"
        }
      ]
    },
    {
      question: "Which is better option to make mobile apps?",
      totalVotes: 0,
      options: [
        {
          choice: "Ionic",
          votes: 0,
          color: "primary"
        },
        {
          choice: "Flutter",
          votes: 0,
          color: "success"
        },
        {
          choice: "React Native",
          votes: 0,
          color: "warning"
        },
        {
          choice: "Framework 7",
          votes: 0,
          color: "danger"
        }
      ]
    },
    {
      question: "Which is better option to make mobile apps?",
      totalVotes: 0,
      options: [
        {
          choice: "Ionic",
          votes: 0,
          color: "primary"
        },
        {
          choice: "Flutter",
          votes: 0,
          color: "success"
        },
        {
          choice: "React Native",
          votes: 0,
          color: "warning"
        },
        {
          choice: "Framework 7",
          votes: 0,
          color: "danger"
        }
      ]
    }
  ];

  }
  

  checkIsVoted(i:any){
    console.log(this.votes);
    let ind =this.votes.indexOf(i)
    if(ind==-1){
      return false
    }
    return true;
  }

  checkVotedOrNot(i:any){
    console.log(this.votes);
    let ind =this.voted.indexOf(i)
    if(ind==-1){
      return false
    }
    return true;
  }
 
  polling(i:any, j:any) {
    let ind =this.voted.indexOf(i)
    if(ind !=-1){
      return;
    }
    this.votes.push(i); 

  
    this.alreadyVoted = true;
    this.polls[i]['options'][j]['votes'] = this.polls[i]['options'][j]      
    ['votes'] + 1;
    this.polls[i]['totalVotes'] = this.polls[i]['totalVotes'] + 1;

    

  }
   
    getValue(votes:any, totalVotes:any) {
    let value = votes / totalVotes;
    return value;
     }
   
    getPercent(votes:any, totalVotes:any) {
    let value = (votes / totalVotes) * 100;
      if(isNaN(Math.round(value))){
        return 0 + "%";
      }
      return Math.round(value) + "%";
     }

     Vote(i:any){
      // alert(this.user.user.userId);
      this.voted.push(i);
      let param:any = {
        "userId" : this.user.user.userId,
        "pollId" : "4",
        "pollAnswerId" : "10"
      }
      this.pollserviceService.postApi('/addVote',param).subscribe(data=>{
  
      },err=>{
  
      })
     }
}
