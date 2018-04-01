import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {DetailTrajetPage} from '../detail-trajet/detail-trajet';
import { FCM } from '@ionic-native/fcm';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  
  public TrajetyRef:firebase.database.Reference;
  public trajetList:Array<any>;
  public loadedtrajetList:Array<any>;
  constructor(private fcm: FCM,public navCtrl: NavController,public AfDatabase : AngularFireDatabase,public loadingCtrl: LoadingController) {
    
    let loader = this.loadingCtrl.create({
      content: "Loading News...",
      duration: 3000
    });
    loader.present();
    


    
    this.TrajetyRef = firebase.database().ref('/trajet');

    this.TrajetyRef.on('value', tList => {
      let trajet = [];
      tList.forEach( item => {
        var obj2 = {id:item.key};
        var a= Object.assign(item.val(), obj2);
        trajet.push(a);
        console.log(trajet);
        return false;
      });
    
      this.trajetList = trajet;
      this.loadedtrajetList = trajet;
      loader.dismiss();
    });
   
  }

  initializeItems(): void {
    this.trajetList = this.loadedtrajetList;
  }
  onInput(searchbar){
    this.initializeItems();
     var q = searchbar.srcElement.value;

     if (!q) {
      return;
    }
    this.trajetList = this.trajetList.filter((v) => {
      if(v.arreverville && q) {
        if ((v.arreverville.toLowerCase().indexOf(q.toLowerCase()) > -1)|| (v.villedepart.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.trajetList.length);

  }
  GoDetaille(trajet){
    this.navCtrl.push(DetailTrajetPage,{'Trajet':trajet});
  }



  ionViewDidLoad(){
    this.notifi();
  }

notifi(){
  this.fcm.getToken().then(token=>{
  
  })
  
  this.fcm.onNotification().subscribe(data=>{
    if(data.wasTapped){
      console.log("Received in background");
    
    } else {
      console.log("Received in foreground");
     
    };
  })
  
}






  
}
