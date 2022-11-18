import { Component } from '@angular/core';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  question:any ='';
  userOption:any
  isDisabled :boolean=false
  constructor( public pollservice: PollserviceService) {}
  ngOnInit() {
    
this.userOption =[
  {
    id:1,
    optionValue : '',
    isVisible : true,
    isDeleted:false,
    placeholder: 'Option 1'
  },
  {
    id:2,
    optionValue : '',
    isVisible : true,
    isDeleted:false,
    placeholder: 'Option 2'
  },
]
}
      addMore(){
        if(this.userOption.length <= 3){
          this.userOption.push({id :this.userOption.length +1,optionValue : '', isVisible : true ,isDeleted:true, placeholder: 'Option '+ (this.userOption.length+1)})
          console.log(this.userOption)
        }else{
          console.log('Max 4')
        }
        
      }
      deleted(value:any,index:number){
        this.userOption.splice(index,1)
      }
      onChangeTime(data :any) {
        console.log(data);        
      }
      post(){
        var content =[]
        
        for(let i =0; i<this.userOption.length;i++){
          content.push(this.userOption[i].optionValue)
        }
        debugger
        // if((this.question != '' && this.question !=null && this.question !=undefined)){
          localStorage.getItem("userObject");
          let url ='/addPoll'
          let postreq ={
            'userId':1,
            'question': this.question,
            'options': content
          }
        
      this.pollservice.postApi(url,postreq).subscribe(response =>{
            debugger
      },
      error =>{
  
      });
        // }else{

        // }
      
      }
}
