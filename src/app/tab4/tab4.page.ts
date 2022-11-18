import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  polls:any;
  alreadyVoted = false;
  percen:Number = 0
  constructor() { }

  ngOnInit() {
   


  


  }
  ionViewWillEnter(){
    this.polls =[
      {
        question: "Which is better option to make mobile apps?",
        totalVotes: 27,
        options: [
          {
            choice: "Ionic",
            votes: 10,
            color: "primary",
            percentage:0
          },
          {
            choice: "Flutter",
            votes: 9,
            color: "success",
            percentage:0
          },
          {
            choice: "React Native",
            votes: 5,
            color: "warning",
            percentage:0
          },
          {
            choice: "Framework 7",
            votes: 3,
            color: "danger",
            percentage:0
          }
        ]
      },
      {
        question: "Which is better option to make mobile apps?",
        totalVotes: 27,
        options: [
          {
            choice: "Ionic",
            votes: 10,
            color: "primary",
            percentage:0
          },
          {
            choice: "Flutter",
            votes: 9,
            color: "success",
            percentage:0
          },
          {
            choice: "React Native",
            votes: 5,
            color: "warning",
            percentage:0
          },
          {
            choice: "Framework 7",
            votes: 3,
            color: "danger",
            percentage:0
          }
        ]
      }
    ];

      this.getPercent()
  }
  // polling(i:any, j:any) {
  //   this.alreadyVoted = true;
  //   this.polls[i]['options'][j]['votes'] = this.polls[i]['options'][j]['votes'] + 1;
  //   this.polls[i]['totalVotes'] = this.polls[i]['totalVotes'] + 1;
  //    }
   
    getValue(i:any, j:any) {
     //let value = i / j;

    let value = this.polls[i].options[j].percentage
     console.log(value)
    return value;
     }
   
    getPercent(votes?:any, totalVotes?:any) {
    // let value = (votes / totalVotes) * 100;
    // return Math.round(value) + "%";

    for(let i = 0;i < this.polls.length ;i++){
      for(let j = 0;j < this.polls[i].options.length ;j++){
        this.percen= this.calculateper(this.polls[i].options[j].votes,this.polls[i].totalVotes)
        this.polls[i].options[j].percentage = this.percen
      }
    }
    console.log(this.polls)
     }

     calculateper(votes:any,totavotes:any){
      let value = (votes / totavotes) ;
     return value;
     }

}
