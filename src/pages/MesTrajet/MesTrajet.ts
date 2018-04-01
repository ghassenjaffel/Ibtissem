import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { ModifierTrajeterPage } from '../ModifierTrajeter/ModifierTrajeter';

@Component({
  selector: 'page-MesTrajet',
  templateUrl: 'MesTrajet.html'
})

export class MesTrajetPage {

 
  MesTrajet:object []=[];  
  constructor( public AfDatabase : AngularFireDatabase,public navCtrl: NavController,public alertCtrl: AlertController,) {
  
    this.AfDatabase.list('/trajet', {
      query: {
        orderByChild:'owner',
        equalTo: firebase.auth().currentUser.uid
      }
      }).subscribe(data => {this.MesTrajet=data;});
      
 
     }


     Remove(x){
      

      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Do you want to delete this trajet?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'yes',
            handler: () => {
              this.AfDatabase.list('/trajet').remove(x.$key);
            }
          }
        ]
      });
      alert.present();
    }


   

    Modifier(t){
      
      this.navCtrl.push(ModifierTrajeterPage,{
      id:t.$key,depart:t.villedepart,arrver:t.arreverville,
      Hd:t.heurdepart,Jd:t.jourdepart,Name:t.name,
      prix:t.Prix
    
      });
     
    }


}