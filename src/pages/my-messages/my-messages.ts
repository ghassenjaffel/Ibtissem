import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Chat } from '../chat/chat';
@IonicPage()
@Component({
  selector: 'page-my-messages',
  templateUrl: 'my-messages.html',
})
export class MyMessagesPage {
  Mesmsgss:object []=[];  
  Mesmsgs:object []=[];  
  userid;
  senderid =[];
  profile:FirebaseObjectObservable<any>; 
  Name;
  constructor(public navCtrl: NavController, public navParams: NavParams,public AfDatabase : AngularFireDatabase,public afAuth: AngularFireAuth) {
    this.userid=firebase.auth().currentUser.uid;
    this.AfDatabase.list('/messages',).subscribe(data => {
     
        data.map(val=>{
          if((val.senderid===this.userid) ||( val.receverid===this.userid)){
          
            if((this.senderid.indexOf(val.receverid)!== -1) && ((this.senderid.indexOf(val.senderid)!== -1)))
            { 
               
            }else{
              this.senderid.push(val.receverid);
              this.senderid.push(val.senderid);
              this.Mesmsgss.push(val);
             
              
           
            }

            
          }
       

        })
        this.loop();
      
      });


    


  }
  loop(){
 
    for(var propertyName in this.Mesmsgss) {
   
     
           if(this.Mesmsgss[propertyName]["senderid"]===firebase.auth().currentUser.uid)
                 this.desplayname(this.Mesmsgss[propertyName]["receverid"],this.Mesmsgss[propertyName]["senderid"])
                else{
                        this.desplayname(this.Mesmsgss[propertyName]["senderid"],this.Mesmsgss[propertyName]["receverid"])
                     }
      
   
  }
  }
  desplayname(uid,id){
  
    this.profile=this.AfDatabase.object(`profile/${uid}`);
    this.profile.subscribe(snapshot => {
      this.senderid.push(uid);
      this.senderid.push(id);
      this.Mesmsgs.push({"name":snapshot.name,"uid":uid}) ;
     
    });
 
   }

   gotochat(msg){
    this.navCtrl.push(Chat,{'touseid':msg.uid,'nameuser':msg.name});
   }
  
}
