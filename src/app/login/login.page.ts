import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm :FormGroup;
  errorMsg ='';
  constructor(public modalCtrl: ModalController,
    public router: Router,
    public pollservice: PollserviceService) {
      this.loginForm = new FormGroup({
        email:  new FormControl('', [Validators.required]),
        password:  new FormControl('', [Validators.required])
      })
     }

  ngOnInit() {
    localStorage.clear();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  login(){
    let url ='/login';

    if (this.loginForm.invalid) {
    
      console.log('Please provide all the required values!')
      // return false;
    } else {
      
      let params = {
        "email":this.loginForm.value.email,
        "password":this.loginForm.value.password,
      }
    
    this.pollservice.postApi(url,params).subscribe(response  =>{
      let res :any = response;
      if( res.status == 'FAILED'){
        this.errorMsg =res.message;
      }else{
        this.pollservice.userType = response;
        this.router.navigate(['/admin-dashboard/tab1']);
      }
        
      },
    error =>{

    });
   
  }
}

  signUP(){
    this.router.navigate(['/add-user']);
  }
}
