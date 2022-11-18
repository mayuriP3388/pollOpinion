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
    let url ='/login',
    params = {
      "email":"diya@gmail.com",
      "password":"diya@321"
      }

    this.pollservice.postApi(url,params).subscribe(response =>{
      response ={"sessionId": "c35c71fc-0bcc-425a-9f21-f6c874f6ed25",
      "user": {
          "userId": 2,
          "name": "diya",
          "email": "diya@gmail.com",
          "role": "admin",
          "createdAt": "2022-11-18T09:21:00.000+00:00"
        }}
        localStorage.setItem("userObject",JSON.stringify(response));
        this.router.navigate(['/admin-dashboard']);
      },
    error =>{

    });
   

    this.router.navigate(['/admin-dashboard']);
  }

  signUP(){
    this.router.navigate(['/add-user']);
  }
}
