import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable,AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Chat } from '../chat/chat';
import { loginPage } from '../login/login';
import { ModifierTrajeterPage } from '../ModifierTrajeter/ModifierTrajeter';

@IonicPage()
@Component({
  selector: 'page-detail-trajet',
  templateUrl: 'detail-trajet.html',
})
export class DetailTrajetPage {
 
  leng: number;
  nbPlaceLibre: any;
  trajet:any; 
  owner:any;
  connected;
  Name;
  lastName;
  MesRes:object []=[]; 
  user:FirebaseObjectObservable<any>; 
  state=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public AfDatabase : AngularFireDatabase,public afAuth: AngularFireAuth) {
    this.trajet= this.navParams.get('Trajet');
  this.connected=firebase.auth().currentUser;
  if(firebase.auth().currentUser!=null)
     this.afAuth.authState.subscribe(auth=>{
      this.AfDatabase.object(`profile/${firebase.auth().currentUser.uid}`);
      this.owner=  auth.uid;
    
    
    })

    this.AfDatabase.list(`trajet/${this.trajet.id}`).subscribe(data => {
      data.map(val=>{
       
        if(val.$key==="nbPlaceLibre")
          this.nbPlaceLibre=val.$value;
         })
      
         } );
  
         this.AfDatabase.list('/Reservation', {
          query: {
            orderByChild:'id',
            equalTo: firebase.auth().currentUser.uid
          }
          }).subscribe(data => {
            this.MesRes=[];
            
            data.map(val=>{
              console.log(val.TrajetId +"  " + this.trajet.id);
              if(val.TrajetId===this.trajet.id)
              this.MesRes=data;
              this.leng=1;
              this.function();
            })
            
          
          });

        
   
  }

  ionViewWillLoad(){
   
    this.afAuth.authState.subscribe(data=>{
      if (data)
    {
      this.user=this.AfDatabase.object(`profile/${data.uid}`);
      this.user.subscribe(snapshot => {
        this.Name= snapshot.name;
        this.lastName=snapshot.lastname;
       
      });
   
  }
    else{
      console.log('u are not connected ');
    }
    })
  }
  function(){
    console.log(this.nbPlaceLibre + "  " +this.MesRes.length)
    if((this.nbPlaceLibre===0) ||(this.MesRes.length > 0))
    this.state=true;
  }
  Reserver(){
    console.log(this.leng) 
    if(firebase.auth().currentUser!=null){
  
      this.AfDatabase.list('/Reservation').push({
                id:firebase.auth().currentUser.uid,
                owner:this.trajet.owner,
                TrajetId:this.trajet.id,
                de:this.trajet.villedepart,
                ver:this.trajet.arreverville,
                name:this.Name + " " + this.lastName,
                state:"wait"

              })
       .then(()=> console.log('hello'));
    }
  }

sandmsg(){
  if(firebase.auth().currentUser!=null){

  this.navCtrl.push(Chat,{'touseid':this.trajet.owner,'nameuser':this.Name});

  }
  else{
    this.navCtrl.push(loginPage);
  }
}
Modifier(t){
  this.navCtrl.push(ModifierTrajeterPage,{
  id:t.id,depart:t.villedepart,arrver:t.arreverville,
  Hd:t.heurdepart,Jd:t.jourdepart,Name:t.name,
  prix:t.Prix

  });
 
}

}
