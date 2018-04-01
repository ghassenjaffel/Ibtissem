import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController,AlertController } from 'ionic-angular';
import { UserPage } from '../../pages/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';
import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { PhoneValidator } from '../../validators/phone.validator';
import {HomePage} from '../home/home';
import { Country } from './SignUp.model';
import 'rxjs/add/operator/take';
import emailMask from 'text-mask-addons/dist/emailMask';

@Component({
  selector: 'page-SignUp',
  templateUrl: 'SignUp.html'
})

export class SignUpPage {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  emailMask = emailMask;

  countries: Array<Country>;
  genders: Array<string>;

  constructor(public afAuth: AngularFireAuth,public afDatabase:AngularFireDatabase,public navCtrl: NavController, public formBuilder: FormBuilder ,public alertCtrl: AlertController) { }

  ionViewWillLoad() {
    this.countries = [
      new Country('TN', 'Tunisia'),
    ];

    this.genders = [
      "Choufeur",
      "Client"
    ];

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

    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
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
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
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
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  onSubmit(values){
   console.log(values);
    this.afAuth.auth.createUserWithEmailAndPassword(values.username+"@gmail.com",values.matching_passwords.password)
    .then(data => {
      let alert = this.alertCtrl.create({
        title: 'ok',
        subTitle: 'You are logged in',
        buttons: ['OK']
      });
      alert.present();
      this.afAuth.authState.subscribe(auth=>{
        this.afDatabase.object(`profile/${auth.uid}`).set({
            name:values.name,lastname:values.lastname,
          email:values.email,username:values.username,
          type:values.gender,phone:values.country_phone.phone})
              .then(()=> this.navCtrl.setRoot( HomePage));
                      })
    })
    .catch(error => {
   
      let alert = this.alertCtrl.create({
        title: error,
        subTitle: 'error !',
        buttons: ['OK']
      });
      alert.present();
    })


     
  

  }

}
