import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { DataService } from '../service/data.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  userObj: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    avatarUrl: ''
  }
  constructor(private auth: ServiceService, private data: DataService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5)])),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null),
    })
  }

  //register function
  register() {
    if(this.registerForm.value.email == '' || this.registerForm.value.password == '') {
      alert('email or password is incorrect');
      return;
    }
    localStorage.setItem('name', this.registerForm.value.name);
    this.auth.register(this.registerForm.value.email, this.registerForm.value.password);
    this.userObj.id = this.registerForm.value.email;
    this.userObj.name = this.registerForm.value.name;
    this.userObj.email = this.registerForm.value.email;
    this.userObj.password = this.registerForm.value.password;
    this.userObj.avatarUrl = 'src/assets/images/male-avt.png';

    this.data.addUser(this.userObj);

    this.registerForm.value.email = '';
    this.registerForm.value.password = '';
  }

}
