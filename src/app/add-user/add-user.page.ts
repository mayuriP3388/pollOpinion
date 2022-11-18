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
 constructor(public formBuilder: FormBuilder,
  public router: Router,
  public pollservice: PollserviceService) { 
  this.addform = new FormGroup({
    username:  new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required]),
    password :new FormControl('', [Validators.required]),
    admin: new FormControl(false)
  })
 }
 
  ngOnInit() {
   
  }

  register(){

  }

  signUP(){

  }
  proceed(){
    console.log(this.addform.value)
    if (this.addform.invalid) {
      this.router.navigate(['/dashboard']);
      console.log('Please provide all the required values!')
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
         
          this.router.navigate(['login']);
        }
        console.log(res)
      })
      console.log(this.addform.value)
    }

  }
}
