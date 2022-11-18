import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PollserviceService } from '../pollservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public modalCtrl: ModalController,
    public router: Router,
    public pollservice: PollserviceService) { }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  login(){
    let url ='',
    params = {

    };

    this.pollservice.postApi(url,params).subscribe(response =>{

    },
    error =>{

    });
   

    this.router.navigate(['/admin-dashboard']);
  }

  signUP(){
    this.router.navigate(['/add-user']);
  }
}
