import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMessagesPage } from './my-messages';

@NgModule({
  declarations: [
    MyMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMessagesPage),
  ],
})
export class MyMessagesPageModule {}
