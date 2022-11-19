import { Component, OnInit } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  polls:any;
  alreadyVoted = false;
  percen:Number = 0
  constructor(public pollservice: PollserviceService,) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.polls =[];
    this.getAllPolls()
  }

    getValue(i:any, j:any) {

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
      if(totavotes > 0){
        let value = (votes / totavotes) ;
        return value;
      }else{
        return 0
      }
      
     }

     getAllPolls(){
      let userid= this.pollservice.userType.user.userId;
      let url ='/getAllPollsForAUser/';
      let sessionId = this.pollservice.userType.sessionId;
      let params ={
        "sessionId": sessionId,
        "userId" :userid
      }
      this.pollservice.postApi(url,params).subscribe(response =>{
       var res:any = response
       var publishRes = res.userPollList
       if(publishRes.length){
        this.calculateTotalVotes(publishRes)
          
       }else{
        console.log('no record found')
       }

         console.log("respone poll",response);
        },
        error =>{
    
        });
      }

  calculateTotalVotes(publishRes: any) {
    for (let i = 0; i < publishRes.length; i++) {
      var totalVotes = 0
      var choice = ''
      var votes = 0
      var answerArray = []
      var color = 'primary'
      for(let j=0;j< publishRes[i].pollAnswers.length;j++){
        totalVotes = publishRes[i].pollAnswers[j].votes + totalVotes
        choice = publishRes[i].pollAnswers[j].optionName
        votes = publishRes[i].pollAnswers[j].votes
        switch (j){
          case 0:
            color = 'primary'
            break;

            case 1:
              color = 'success'
            break;
            case 2:
              color = 'warning'
            break;
            case 3:
              color = 'danger'
            break;
            default:
              color ='primary'
        }
        answerArray.push({ choice: choice,votes: votes,color:color})

        
      }
       this.polls.push({totalVotes:totalVotes,options:answerArray,question:publishRes[i].poll.question})
      
      }
      this.getPercent()
    console.log(this.polls)
  }

}
