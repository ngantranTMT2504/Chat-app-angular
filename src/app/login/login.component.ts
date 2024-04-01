import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private service : ServiceService ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null)
    })
  }

  login() {
    if(this.loginForm.value.email == '' || this.loginForm.value.password == '') {
      alert('email or password is incorrect');
      return;
    }
    localStorage.setItem('name', this.loginForm.value.name);
    this.service.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.value.email = '';
    this.loginForm.value.password = '';
  }

}
