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
  errMSG ='';
  email ="";
  password ="";
  constructor(public modalCtrl: ModalController,
    public router: Router,
    public pollservice: PollserviceService) {
      this.loginForm = new FormGroup({
        email:  new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password:  new FormControl('', [Validators.required])
      })
     }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.errMSG = '';
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
  get f() { return this.loginForm.controls; }
  login(){
    let url ='/login';

    if (this.loginForm.invalid) {
    
      console.log('Please provide all the required values!',this.loginForm);
      if(this.loginForm.value.email == '' && this.loginForm.value.password == ''){
        this.errMSG ='Please enter the required values!'
      }else if(this.loginForm.value.email == ''){
        this.errMSG ='Please enter email!'
      }else if(this.loginForm.value.password == ''){
        this.errMSG ='Please enter password!'
      }else if(this.loginForm.value.email != '') {
        let emailPattern = /^[A-Za-z0-9]+([._-]{0,1}[A-Za-z0-9])+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if(!emailPattern.test(this.loginForm.value.email))
          this.errMSG ='Enter Valid Email';
      }
      // return false;
    } else {
      
      let params = {
        "email":this.loginForm.value.email,
        "password":this.loginForm.value.password,
      }
    
    this.pollservice.postApi(url,params).subscribe(response =>{
      let res :any= response;
      if(res.status == 'FAILED'){
        this.errMSG =res.message;
      }else{
        this.pollservice.userType = response;
        this.errMSG ='';
        this.loginForm.setValue({email: '', password: ''});
        this.router.navigate(['/admin-dashboard/tab1']);
        this.errMSG ='';
      }
       
      },
    error =>{

    });
   
  }
}

  signUP(){
    this.loginForm.setValue({email: '', password: ''});
    this.router.navigate(['/add-user']);
  }
}
