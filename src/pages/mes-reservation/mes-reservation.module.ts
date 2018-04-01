import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesReservationPage } from './mes-reservation';

@NgModule({
  declarations: [
    MesReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(MesReservationPage),
  ],
})
export class MesReservationPageModule {}
