import { Component } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  polls :any=[];
  constructor( public pollservice: PollserviceService) {}
  ngOnInit(){
    this.polls = this.pollservice.unpublishList
  }
 
  approve(item:any){
    let userid= this.pollservice.userType.user.userId;
    let url ='/publishPoll';
    let sessionId = this.pollservice.userType.sessionId;
    let params = {
      "sessionId": sessionId,
      "userId" :userid,
      "pollid":item.poll.pollId
    }
    this.pollservice.postApi(url,params).subscribe(response =>{
     
       console.log("respone poll",response);
       let res1 :any= response;
      //  this.pollservice.unpublishList= res1.unplishedPolls;
      
      },
    error =>{

    });
  }

  
}
