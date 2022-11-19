import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollserviceService } from '../pollservice.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  showtab =true;
  userName ="";
  constructor(public pollservice: PollserviceService,
    public router: Router,
    public alertController:AlertController
    ) { }

  ngOnInit() {
    
      this.showtab =  this.pollservice.userType.user['role']== 'admin' ? true: false;
      this.userName =  this.pollservice.userType.user['name'];

    this.getAllPolls();
  }
  getAllPolls(){
    let userid= this.pollservice.userType.user.userId;
    let url ='/getAllPublishedPolls';
    let sessionId = this.pollservice.userType.sessionId;
   
    this.pollservice.postApi(url,{}).subscribe(response =>{
     
       console.log("respone poll",response);
       let res1 :any= response;
    //    this.pollservice.unpublishList= res1.unplishedPolls;
       
      },
    error =>{

    });
  }

  async logout(){
    const alert = await this.alertController.create({
      header: 'Are you sure want to logout?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'cancel',
          cssClass: 'alert-button-cancel',
          role:'cancel',
          handler:(data=>{

          })
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler:(data=>{
            let url = "/logout";
            let param = {
                "sessionId":this.pollservice.userType.sessionId,
                "userId": this.pollservice.userType.user.userId
            }
            this.pollservice.postApi(url,param).subscribe(response =>{
                let res1 :any= response;
                this.pollservice.userType =null;
                this.router.navigate(['login']);
              },
            error =>{
        
            });
          })
        },
      ],
      
    });

    await alert.present();

    

  }

}
