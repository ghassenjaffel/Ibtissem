import { Component } from '@angular/core';
import { NavController,AlertController ,NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-Deconnexion',
  templateUrl: 'Deconnexion.html'
})

export class DeconnexionPage {

constructor( public db : AngularFireDatabase,public navCtrl: NavController,public alertCtrl: AlertController,public navp : NavParams) {

firebase.auth().signOut().then(()=>{
this.navCtrl.setRoot(HomePage);
})

}}
