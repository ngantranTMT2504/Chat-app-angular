import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  connectImg:string = 'assets/images/connect.jpg';
  googleIcon:string = 'assets/images/google.png';

  loginForm!: FormGroup;
  currentUser : any;

  constructor(
    private router: Router, 
    private service : ServiceService,
    private data : DataService
    ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null)
    })
  }

  getCurrentUser() {
    this.data.getUser(this.loginForm.value.email).subscribe(res => {
       //set current user on sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(res.data()));
      console.log(res.data());
      return res.data();
    })
  }

  login() {
    if(this.loginForm.value.email == '' || this.loginForm.value.password == '') {
      alert('email or password is incorrect');
      return;
    }
    this.service.login(this.loginForm.value.email, this.loginForm.value.password);
    this.getCurrentUser();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '');
    
    //reset login form
    this.loginForm.value.email = '';
    this.loginForm.value.password = '';
  }

}
