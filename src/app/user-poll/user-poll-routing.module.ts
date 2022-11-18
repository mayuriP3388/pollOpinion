import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPollPage } from './user-poll.page';

const routes: Routes = [
  {
    path: '',
    component: UserPollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPollPageRoutingModule {}
