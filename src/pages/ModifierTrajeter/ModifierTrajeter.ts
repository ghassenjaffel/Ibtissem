import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-ModifierTrajeter',
  templateUrl: 'ModifierTrajeter.html'
})
export class ModifierTrajeterPage {
  
  
 
 
  arrver: any;
  public event = {
    month: '1990-02-18',
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

  depart: any;
  id:any;
  P: any;
  Nam: any;
  Jd: any;
  Hd: any;
  public firstname: string = 'John';
  constructor(public navParams: NavParams,public afAuth: AngularFireAuth,public AfDatabase : AngularFireDatabase,public navCtrl: NavController) {
    this.id= this.navParams.get('id');
    this.depart= this.navParams.get('depart');
    this.arrver= this.navParams.get('arrver');
    this.Hd= this.navParams.get('Hd');
    this.Jd= this.navParams.get('Jd');
    this.Nam= this.navParams.get('Name');
    this.P= this.navParams.get('prix');
   
    if(this.Hd.hour>9)    {
      this.event.timeStarts=this.Hd.hour+":"+this.Hd.minute;
    }
     else{
        this.event.timeStarts="0"+this.Hd.hour+":"+this.Hd.minute;
       }

       if(this.Jd.day>9)    {

        if(this.Jd.month>9)  

        this.event.month=this.Jd.year+"-"+this.Jd.month+"-"+this.Jd.day;

        else

        this.event.month=this.Jd.year+"-0"+this.Jd.month+"-"+this.Jd.day;
      }
       else{

        if(this.Jd.month>9)  

          this.event.month=this.Jd.year+"-"+this.Jd.month+"-0"+this.Jd.day;
          else

          this.event.month=this.Jd.year+"-"+this.Jd.month+"-0"+this.Jd.day;
        }
  }






  onInput(x){
      console.log(x.target.value);
  }
  ajouter(){
    this.AfDatabase.list('/trajet').update(this.id,{
  
     "villedepart":this.departville.value,
      "arreverville":this.arreverville.value,"jourdepart":this.jourdepart.value,
      "heurdepart":this.heurdepart.value,"name":this.Name.value,
  
    }).then(()=>{ alert("Trajet Modifier avec succes");
       this.navCtrl.push(HomePage)});
  }


 


}
