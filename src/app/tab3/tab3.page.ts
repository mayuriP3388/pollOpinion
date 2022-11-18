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

  onInputChange(ev: any, i: any) {
    let val = ev.target.value;
    if (ev.target.value.trim() != '') {
      this.userOption[i].isValid = true
    } else {
      this.userOption[i].isValid = false
    }
    //ToDo
  }

  isDisabled(): any {

  }
  async post() {
    var ischech = false
    if (this.userOption.length) {
      for (let i = 0; i < this.userOption.length; i++) {
        if (this.userOption[i].isValid) {
          ischech = true
        } else {
          ischech = false
        }
      }
    } else {
      ischech = false
    }

    if (ischech) {
      var content = []

      for (let i = 0; i < this.userOption.length; i++) {
        content.push(this.userOption[i].optionValue)
      }
      debugger
      // if((this.question != '' && this.question !=null && this.question !=undefined)){
      var userObject = localStorage.getItem('userObject');
      let record
      let userId
      if (userObject != undefined || userObject != null) {
        debugger
        record = JSON.parse(userObject);
        userId = record.user.userId

        console.log("record", record)
      }
      let url = '/addPoll'
      let postreq = {
        'userId': userId,
        'question': this.question,
        'options': content
      }

      this.pollservice.postApi(url, postreq).subscribe(response => {
        debugger
      },
        error => {

        });
    }

    else {
      const toast = await this.toastController.create({
        message: 'Please enter required field',
        position: 'bottom',
        duration: 3000,
      });
      toast.present();
      return
    }

  }
}
