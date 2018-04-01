import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandeResPage } from './demande-res';

@NgModule({
  declarations: [
    DemandeResPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandeResPage),
  ],
})
export class DemandeResPageModule {}
