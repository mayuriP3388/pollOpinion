import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPollPageRoutingModule } from './user-poll-routing.module';

import { UserPollPage } from './user-poll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPollPageRoutingModule
  ],
  declarations: [UserPollPage]
})
export class UserPollPageModule {}
