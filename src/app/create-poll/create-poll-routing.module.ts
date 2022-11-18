import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePollPage } from './create-poll.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePollPageRoutingModule {}
