import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

import { AjouterTrajeterPage } from '../AjouterTrajeter/AjouterTrajeter';
import { DemandeResPage } from '../demande-res/demande-res';
import { MesTrajetPage } from '../MesTrajet/MesTrajet';
import { MyMessagesPage } from '../my-messages/my-messages';
import { MesReservationPage } from '../mes-reservation/mes-reservation';
import { FirebaseObjectObservable,AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  type: any;
  TajetList: any = MesTrajetPage;
  Add: any = AjouterTrajeterPage;
  Profile: any = UserPage;
  DemandeRes: any=DemandeResPage;
  MesMsg:any=MyMessagesPage;
  Mesres:any=MesReservationPage;
 
  MesDemande:object []=[];  
  user:FirebaseObjectObservable<any>; 
  t="Choufeur";
  constructor(public AfDatabase : AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public afDatabase:AngularFireDatabase,public afAuth: AngularFireAuth) {
   
    this.afDatabase.list('/Reservation', {
      query: {
        orderByChild:'owner',
        equalTo: firebase.auth().currentUser.uid
      }
      }).subscribe(data => {
        this.MesDemande=[];
        data.map(val=>{
          if(val.state==="wait")
          this.MesDemande.push(val);
        })
        
      
      });
 
  }
  ionViewWillLoad(){
  
    this.afAuth.authState.subscribe(data=>{
      if (data)
    {
      this.user=this.AfDatabase.object(`profile/${data.uid}`);
      this.user.subscribe(snapshot => {
        this.type= snapshot.type;
      });
   
  }
    else{
      console.log('u are not connected ');
    }
    })
  }

  

}
