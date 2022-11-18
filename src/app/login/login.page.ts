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
  constructor(public modalCtrl: ModalController,
    public router: Router,
    public pollservice: PollserviceService) {
      this.loginForm = new FormGroup({
        email:  new FormControl('', [Validators.required]),
        password:  new FormControl('', [Validators.required])
      })
     }

  ngOnInit() {
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
    
    this.pollservice.postApi(url,params).subscribe(response =>{
        localStorage.setItem("userObject",JSON.stringify(response));
        this.router.navigate(['/admin-dashboard']);
      },
    error =>{

    });
    this.router.navigate(['/admin-dashboard']);
  }
}

  signUP(){
    this.router.navigate(['/add-user']);
  }
}
