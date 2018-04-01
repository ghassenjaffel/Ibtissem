import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-mes-reservation',
  templateUrl: 'mes-reservation.html',
})
export class MesReservationPage {
  nbPlaceLibre: any;
  trajetid: any;
  state: any;
  MesRes:object []=[]; 
  accept="Accepted" ;
  wait="wait";
  refused="Refused";
  constructor(public navCtrl: NavController, public navParams: NavParams,public AfDatabase : AngularFireDatabase,public alertCtrl: AlertController) {
    this.AfDatabase.list('/Reservation', {
      query: {
        orderByChild:'id',
        equalTo: firebase.auth().currentUser.uid
      }
      }).subscribe(data => {
        
        this.MesRes=data;
        data.map(val=>{
        this.state=val.state;
        this.trajetid=val.TrajetId;
        })
      
      } );

  }

  refuser(demande){
    this.AfDatabase.list(`trajet/${this.trajetid}`).subscribe(data => {
      data.map(val=>{
       
        if(val.$key==="nbPlaceLibre")
          this.nbPlaceLibre=val.$value;
     })
      
      } );

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to Cancel this reservation?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log(this.nbPlaceLibre);
          }
        },
        {
          text: 'yes',
          handler: () => {
            if(this.state==="Accepted")
            {
              this.AfDatabase.list('/trajet').update(this.trajetid,{
  
                "nbPlaceLibre":this.nbPlaceLibre+1
             
               });
              this.AfDatabase.list('/Reservation').remove(demande.$key);
          
             }
             else
             this.AfDatabase.list('/Reservation').remove(demande.$key);
          }
        }
      ]
    });
    alert.present();
  }
  }

