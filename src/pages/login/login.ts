import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import {SignUpPage} from '../SignUp/SignUp';
import {HomePage} from '../home/home';
import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  @ViewChild('Username') Username;
  @ViewChild('Password') Password;
  

  constructor(public afAuth: AngularFireAuth ,public navCtrl: NavController,public alertCtrl: AlertController,public formBuilder: FormBuilder) {

  }
  ionViewWillLoad() {


    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

  

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
    
    
      matching_passwords: this.matching_passwords_group,
   
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
  
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
  
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
   
  };


  signup(){
        this.navCtrl.push( SignUpPage);
      }
      onSubmit(values){
        this.afAuth.auth.signInWithEmailAndPassword(values.username+"@gmail.com",values.matching_passwords.password)
        .then(data => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch(error => {
          let alert = this.alertCtrl.create({
            title: 'Incorrect username or password ! ',
            subTitle: 'error !',
            buttons: ['OK']
          });
          alert.present();
        })
      }
}
