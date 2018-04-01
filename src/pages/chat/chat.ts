import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { FCM } from '@ionic-native/fcm';
import * as firebase from 'firebase';
import { FirebaseObjectObservable,AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {

    @ViewChild(Content) content: Content;
    @ViewChild ('msge') msge;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    touseid;
    Name;
    userr:FirebaseObjectObservable<any>;
    messagelist:object []=[];
    firestore = firebase.database().ref('/pushtokens');
    firemsg = firebase.database().ref('/messages');
    userid;
    nameuser;
    constructor(public afAuth: AngularFireAuth,navParams: NavParams, private chatService: ChatService, private events: Events,private fcm: FCM,public afd: AngularFireDatabase) {
        // Get the navParams toUserId parameter
        this.touseid=navParams.get('touseid');
       this.nameuser=navParams.get('nameuser');
        this.userid=firebase.auth().currentUser.uid;
        this.afd.list('/messages',).subscribe(data => {
            this.messagelist=[];
              data.map(val=>{
                if(((val.senderid===this.userid) &&( val.receverid===this.touseid))||((val.senderid===this.touseid)&&(val.receverid===this.userid)))
                this.messagelist.push(val);
              })
              
            
            });
      
            this.scrollToBottom();

        this.toUser = {
            id: navParams.get('toUserId'),
            name: navParams.get('toUserName')
        };
        // Get mock user information
        this.chatService.getUserInfo()
        .then((res) => {
            this.user = res
        });
    }

    ionViewWillLoad(){
  
        this.afAuth.authState.subscribe(data=>{
          if (data)
        {
          this.userr=this.afd.object(`profile/${data.uid}`);
          this.userr.subscribe(snapshot => {
            this.Name= snapshot.name;
           
           
          });
       
      }
        else{
          console.log('u are not connected ');
        }
        })
      }


// send push notification
    ionViewDidLoad(){
        this.notifi();
      }
    
    notifi(){
      this.fcm.getToken().then(token=>{
        
      })
      
      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          
        } else {
        
        };
      })

    }
    
    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
        //get message list
        this.getMsg();

        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })
    }


  tokensetup() {
    var promise = new Promise((resolve, reject) => {
        this.fcm.getToken().then(token=>{
            resolve(token);
      }, (err) => {
        reject(err);
    });
    })
    return promise;
  }

  storetoken(t) {
   
    this.afd.list(this.firestore).push({
      uid: this.touseid,
      devtoken: t
        
    }).then(() => {
     
      })

    this.afd.list(this.firemsg).push({
      sendername: this.Name,
      message: this.msge.value,
      senderid:firebase.auth().currentUser.uid,
      receverid:this.touseid,
      true:true
    }).then(() => {
     
      });
 
}

  
    onFocus() {
  
        
        this.content.resize();
        this.scrollToBottom();
    }

  

    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    private getMsg() {
        // Get mock message list
        return this.chatService
        .getMsgList()
        .subscribe(res => {
            this.msgList = res;
            this.scrollToBottom();
        });
    }

    /**
     * @name sendMsg
     */
    sendMsg() {
        this.tokensetup().then((token) => {
            this.storetoken(token);
          })
        if (!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';


        this.chatService.sendMsg(newMsg)
        .then(() => {
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
                this.msgList[index].status = 'success';
            }
        })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
              toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }
}
