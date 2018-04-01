import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import {HomePage} from '../home/home';
@Component({
  selector: 'page-AjouterTrajeter',
  templateUrl: 'AjouterTrajeter.html'
})
export class AjouterTrajeterPage {
  
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20',
    timeStartss: '07:43',
}
@ViewChild ('departville') departville;
@ViewChild ('arreverville') arreverville;
@ViewChild ('jourdepart') jourdepart;
@ViewChild ('heurdepart') heurdepart;
@ViewChild ('Name') Name;
@ViewChild ('Prix') Prix;
@ViewChild ('Matricule') Matricule;
@ViewChild('NbPlace') NbPlace;


phone:any;

  constructor(public afAuth: AngularFireAuth,public AfDatabase : AngularFireDatabase,public navCtrl: NavController) {

  }






  onInput(x){
      console.log(x.target.value);
  }
  ajouter(){
    
var x = this
  .AfDatabase.object(`profile/${firebase.auth().currentUser.uid}`);
        x.forEach(element => {
  this.phone = element.phone;

});
 
    this.AfDatabase.list('/trajet').push({
      owner:firebase.auth().currentUser.uid,villedepart:this.departville.value,
      arreverville:this.arreverville.value,jourdepart:this.jourdepart.value,
      heurdepart:this.heurdepart.value,name:this.Name.value,
      Phone:this.phone, nbPlaceLibre:this.NbPlace.value,Prix:this.Prix.value,Matricule:this.Matricule.value

      

  })
  .then(()=>this.navCtrl.setRoot(HomePage));
  }


 


}
