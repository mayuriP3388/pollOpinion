import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  createPoll(){
    this.router.navigate(['create-poll']);
  }
  userpoll(){
    this.router.navigate(['user-poll']);
  }
}
