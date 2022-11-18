import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivepollPage } from './livepoll.page';

const routes: Routes = [
  {
    path: '',
    component: LivepollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivepollPageRoutingModule {}
