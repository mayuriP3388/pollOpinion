import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  question: any = '';
  userOption: any
  isDisable:boolean = false
  error:any;
  constructor(public pollservice: PollserviceService, public toastController:ToastController,) { }
  ngOnInit() {

    this.userOption = [
      {
        id: 1,
        optionValue: '',
        isVisible: true,
        isDeleted: false,
        placeholder: 'Option 1',
        isValid: false
      },
      {
        id: 2,
        optionValue: '',
        isVisible: true,
        isDeleted: false,
        placeholder: 'Option 2',
        isValid: false
      },
    ]
  }
  addMore() {
    if (this.userOption.length <= 3) {
      this.userOption.push({ id: this.userOption.length + 1, optionValue: '', isVisible: true, isDeleted: true, placeholder: 'Option ' + (this.userOption.length + 1), isValid: false })
      console.log(this.userOption)
    } else {
      console.log('Max 4')
    }

  }
  deleted(value: any, index: number) {
    this.userOption.splice(index, 1)
  }
  onChangeTime(data: any) {
    console.log(data);
  }

  isDisabled(): any {

  }
  validation():any{
    if(this.question !='' &&  this.question !=undefined && this.question !=null ){
     let ischech =false
     if (this.userOption.length) {
      for (let i = 0; i < this.userOption.length; i++) {
        if (this.userOption[i].optionValue) {
          ischech = true
        } else {
          ischech = false
          break
        }
       }
      if(ischech){
        this.error =''
          return true
      } else{
        
        return false
      }
    }else{
      return false
    }
  }
}
  async post() {

   if (this.validation()) {
      var content = []
      this.error = ''
      for (let i = 0; i < this.userOption.length; i++) {
        content.push(this.userOption[i].optionValue)
      }
      
 
      let userid= this.pollservice.userType.user.userId;
      let sessionId = this.pollservice.userType.sessionId;
      let url = '/addPoll'
      let postreq = {
        'sessionId': sessionId,
        'userId': userid,
        'question': this.question,
        'options': content
      }

      this.pollservice.postApi(url, postreq).subscribe(async response => {
        console.log(response)
          const toast = await this.toastController.create({
        message: 'Your Poll is Pending for Approval',
        position: 'bottom',
        duration: 3000,
      });
      toast.present();
      return
        
      },
        error => {

        });
    }

    else {
      this.error ="'Please Enter Required Field'"
      // const toast = await this.toastController.create({
      //   message: 'Please enter required field',
      //   position: 'bottom',
      //   duration: 3000,
      // });
      // toast.present();
      // return
    }

  }

}

