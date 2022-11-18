import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-poll',
  templateUrl: './user-poll.page.html',
  styleUrls: ['./user-poll.page.scss'],
})
export class UserPollPage implements OnInit {

  constructor() { }
  alreadyVoted = false;
  polls:any
  // votes :any
  // totalVotes :any
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
    }
  ];

  }
 
  polling(i:any, j:any) {

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
    return Math.round(value) + "%";
     }
}
