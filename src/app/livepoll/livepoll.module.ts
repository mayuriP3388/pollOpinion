import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivepollPageRoutingModule } from './livepoll-routing.module';

import { LivepollPage } from './livepoll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivepollPageRoutingModule
  ],
  declarations: [LivepollPage]
})
export class LivepollPageModule {}
