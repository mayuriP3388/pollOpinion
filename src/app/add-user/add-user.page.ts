import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  addform: FormGroup ;
  errMSG ='';
 constructor(public formBuilder: FormBuilder,
  public router: Router,
  public pollservice: PollserviceService) { 
  this.addform = new FormGroup({
    username:  new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password :new FormControl('', [Validators.required]),
    admin: new FormControl(false)
  })
 }
 
  ngOnInit() {
   
  }

  register(){

  }

  signUP(){
    this.router.navigate(['/login']);
  }
  proceed(){
    console.log(this.addform.value)
    if (this.addform.status == "INVALID") {
    
      console.log('Please provide all the required values!')
      if(this.addform.value.email == '' || this.addform.value.password == '' || this.addform.value.username ==''){
        this.errMSG ='Please enter the required values!'
      }else if(this.addform.value.username == ''){
        this.errMSG ='Please enter username!'
      }else if(this.addform.value.email == ''){
        this.errMSG ='Please enter email!'
      }else if(this.addform.value.password == ''){
        this.errMSG ='Please enter password!'
      }else if(this.addform.value.email != '') {
        let emailPattern = /^[A-Za-z0-9]+([._-]{0,1}[A-Za-z0-9])+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if(!emailPattern.test(this.addform.value.email))
          this.errMSG ='Enter Valid Email';
      }else{
        this.errMSG ='';
      }
      // return false;
    } else {
      // this.pollservice.name= this.addform.value.name;
      let type = this.addform.value.admin ? 'admin': 'user';
      
      let url ='/addUser',
      body = {
        "email":this.addform.value.email,
        "name":this.addform.value.username,
        "password":this.addform.value.password,
        "role":type
    }
    
      this.pollservice.postApi(url,body).subscribe((res :any) => {
        if(res.message == "SUCCESS"){
         
          this.router.navigate(['/login']);
        }
        console.log(res)
      })
      console.log(this.addform.value)
    }

  }
}
