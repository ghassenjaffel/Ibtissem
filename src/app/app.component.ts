import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { loginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/SignUp/SignUp';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { MesTrajetPage } from '../pages/MesTrajet/MesTrajet';

import { DeconnexionPage } from '../pages/Deconnexion/Deconnexion';

import { DemandeResPage } from '../pages/demande-res/demande-res';

import { AjouterTrajeterPage } from '../pages/AjouterTrajeter/AjouterTrajeter';
const firebaseAuth = {
  apiKey: "AIzaSyCRqy59JrXC9gLJxBoPeHHspQkbKBFXcE8",
  authDomain: "ibti-7f6a1.firebaseapp.com",
  databaseURL: "https://ibti-7f6a1.firebaseio.com",
  projectId: "ibti-7f6a1",
  storageBucket: "",
  messagingSenderId: "801097166710"

};
firebase.initializeApp(firebaseAuth);
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon:any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public afAuth: AngularFireAuth) {
    this.initializeApp();

    firebase.auth().onAuthStateChanged((user) =>  {if (user) { 

    this.pages = [
      { title: '  Home', component: HomePage ,icon: "home"},
      { title: 'Profile', component: TabsPage ,icon: "person"},
      { title: 'Déconnexion', component: DeconnexionPage ,icon: "log-out"},
  
      
    ];
  } else { 
    this.pages = [
      
      { title: ' Home', component: HomePage ,icon: "home" },
      { title: 'Login', component: loginPage ,icon: "log-in"},
     
      
   
    ];

  } });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
