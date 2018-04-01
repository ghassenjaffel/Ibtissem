import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { loginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { DemandeResPage } from '../pages/demande-res/demande-res';
import { SignUpPage } from '../pages/SignUp/SignUp';
import { DeconnexionPage } from '../pages/Deconnexion/Deconnexion';
import { AjouterTrajeterPage } from '../pages/AjouterTrajeter/AjouterTrajeter';
import { Chat } from '../pages/chat/chat';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MesTrajetPage } from '../pages/MesTrajet/MesTrajet';
import { DetailTrajetPage } from '../pages/detail-trajet/detail-trajet';
import { FCM } from '@ionic-native/fcm';
import { ChatService } from '../providers/chat-service';
import { EmojiProvider } from '../providers/emoji';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";

import { MyMessagesPage } from '../pages/my-messages/my-messages';
import { MesReservationPage } from '../pages/mes-reservation/mes-reservation';
import { ModifierTrajeterPage } from '../pages/ModifierTrajeter/ModifierTrajeter';
const firebaseAuth = {
  apiKey: "AIzaSyCRqy59JrXC9gLJxBoPeHHspQkbKBFXcE8",
  authDomain: "ibti-7f6a1.firebaseapp.com",
  databaseURL: "https://ibti-7f6a1.firebaseio.com",
  projectId: "ibti-7f6a1",
  storageBucket: "",
  messagingSenderId: "801097166710"

};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    loginPage,
    AjouterTrajeterPage,
    SignUpPage,
    UserPage,
    TabsPage,
    DemandeResPage,
    DeconnexionPage,
    MesTrajetPage,
    DetailTrajetPage,
    Chat,
    MyMessagesPage,
    MesReservationPage,
    ModifierTrajeterPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    loginPage,
    AjouterTrajeterPage,
    SignUpPage,
    UserPage,
    TabsPage,
    DemandeResPage,
    DeconnexionPage,
    MesTrajetPage,
    DetailTrajetPage,
    Chat,
    MyMessagesPage,
    MesReservationPage,
    ModifierTrajeterPage
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    ChatService,
    EmojiProvider,
    AngularFireDatabase,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
