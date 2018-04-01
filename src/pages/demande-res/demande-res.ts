import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-demande-res',
  templateUrl: 'demande-res.html',
})
export class DemandeResPage {
  nbPlaceLibre: any;
  MesDemande:object []=[];  
  state="wait";
  constructor(public navCtrl: NavController, public navParams: NavParams,public AfDatabase : AngularFireDatabase) {

    this.AfDatabase.list('/Reservation', {
      query: {
        orderByChild:'owner',
        equalTo: firebase.auth().currentUser.uid
      }
      }).subscribe(data => {this.MesDemande=data;});

  }

  accept(item){

    this.AfDatabase.list(`trajet/${item.TrajetId}`).subscribe(data => {
      data.map(val=>{
       
        if(val.$key==="nbPlaceLibre")
          this.nbPlaceLibre=val.$value;
     })
      console.log(this.nbPlaceLibre)
      } );
       this.AfDatabase.list('/Reservation').update(item.$key,{'state':"Accepted"});
       this.AfDatabase.list('/trajet').update(item.TrajetId,{"nbPlaceLibre":this.nbPlaceLibre-1});
  }

refuser(item){
       this.AfDatabase.list('/Reservation').update(item.$key,{'state':"Refused"});
}
}
