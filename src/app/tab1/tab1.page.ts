import { Component } from '@angular/core';
import { type } from 'os';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  alreadyVoted = false;
  polls:any = [];
  votes:any = [];
  user:any={};
  voted:any=[];
  constructor(public pollserviceService:PollserviceService) {}

  // votes :any
  // totalVotes :any

  ionViewDidEnter(){
    let userObject:any =localStorage.getItem('userObject');
    this.user = this.pollserviceService.userType;
    this.votes = [];
    this.getAllPolls();
  }

 
    getAllPolls(){
      let userid= this.pollserviceService.userType.user.userId;
      let url ='/getAllPublishedPolls';
      let sessionId = this.pollserviceService.userType.sessionId;
      let params ={
        "sessionId": sessionId,
        "userId" :userid
      }
      this.pollserviceService.getApi(url).subscribe(response =>{
        let res:any = response;
         this.polls = res.publishedPolls;
        for(let i=0;i<this.polls.length;i++){
          let totalVotes = 0;
          for(let j=0;j<this.polls[i].pollAnswers.length;j++){
            totalVotes += this.polls[i].pollAnswers[j].votes;
          }
          this.polls[i].poll.totalVotes = totalVotes;
        }
         console.log(this.polls,'pol');
      });
    }

  ngOnInit() {

  }
  

  checkIsVoted(i:any){
    console.log(this.votes);
    let ind =this.votes[i];
    if(typeof ind ==='undefined' || ind ==null){
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
 
  polling(i:any, j:any,index:any,ans_index:any) {
    let ind =this.voted.indexOf(j)
    if(ind !=-1){
      return;
    }
    this.votes[j]=i; 

  
    this.alreadyVoted = true;
    this.polls[index]['options'][ans_index]['votes'] = this.polls[index]['options'][ans_index]      
    ['votes'] + 1;
    this.polls[index]['totalVotes'] = this.polls[index]['totalVotes'] + 1;
    this.polls[index].poll.totalVotes = this.polls[index].poll.totalVotes  + 1;

    

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

     Vote(pollId:any){
      console.log(this.user);
      this.voted.push(pollId);
      let sessionId = this.pollserviceService.userType.sessionId;
      
      let param:any = {
        "userId" : this.user.user.userId,
        "pollId" : pollId,
        "pollAnswerId" :this.votes[pollId],
        "sessionId": sessionId,
      }
      this.pollserviceService.postApi('/addVote',param).subscribe(data=>{
  
      },err=>{
  
      })
     }
}
