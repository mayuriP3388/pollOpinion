import { Component } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  polls :any=[];
  approved= false;
  constructor( public pollservice: PollserviceService) {}
  ngOnInit(){
    this.getAllUnpublishPolls();
  }
 
  approve(item:any,index:any){
    let userid= this.pollservice.userType.user.userId;
    let url ='/publishPoll';
    let sessionId = this.pollservice.userType.sessionId;
    let params = {
      "sessionId": sessionId,
      "userId" :userid,
      "pollId":item.poll.pollId
    }
    this.pollservice.postApi(url,params).subscribe(response =>{
     
       console.log("respone poll",response);
       let res1 :any= response;
       if(res1.status =='FAILED'){
        this.approved = false;
       }else{
       this.polls[index].poll.published =true;
       
       }
      
      
      },
    error =>{

    });
  }
  getAllUnpublishPolls(){
    let userid= this.pollservice.userType.user.userId;
    let url ='/getAllUnblishedAndPublishedPolls';
    let sessionId = this.pollservice.userType.sessionId;
   
    this.pollservice.postApi(url,{sessionId:sessionId}).subscribe(response =>{
     
       console.log("getAllUnblishedAndPublishedPolls poll",response);
       let res1 :any= response;
       this.pollservice.unpublishList= res1.unpublishedPolls;
       this.polls = this.pollservice.unpublishList;
    //    this.pollservice.unpublishList= res1.unplishedPolls;
       
      },
    error =>{

    });
  }
  unpublish(item:any,index:any){
    let userid= this.pollservice.userType.user.userId;
    let url ='/unPublishPoll';
    let sessionId = this.pollservice.userType.sessionId;
    let params = {
      "sessionId": sessionId,
      "userId" :userid,
      "pollId":item.poll.pollId
    }
    this.pollservice.postApi(url,params).subscribe(response =>{
     
       console.log("respone poll",response);
       let res1 :any= response;
       if(res1.status =='FAILED'){
        this.approved = false;
       }else{
        this.polls[index].poll.published =false;
       
       }
      //  this.pollservice.unpublishList= res1.unpublishedPolls;
      // this.polls = this.pollservice.unpublishList;
      
      },
    error =>{

    });
  }
}
