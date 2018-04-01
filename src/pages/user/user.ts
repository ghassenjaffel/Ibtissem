import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import {Profile} from'../../models/profile';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectObservable,AngularFireDatabase } from 'angularfire2/database-deprecated';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  profile:FirebaseObjectObservable<any>; 
  show: boolean = true;
  constructor(public navCtrl: NavController,public afDatabase:AngularFireDatabase,public afAuth: AngularFireAuth) {
    
  }
ionViewWillLoad(){
  
  this.afAuth.authState.subscribe(data=>{
    if (data)
  {
    this.profile=this.afDatabase.object(`profile/${data.uid}`);
  
 
}
  else{
    console.log('hiii');
  }
  })
}
}
