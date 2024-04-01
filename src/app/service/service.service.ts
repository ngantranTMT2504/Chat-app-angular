import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private fireAuth : AngularFireAuth,
    private router: Router) { }

  //register service
  register(email: string, password:string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('register successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.massage);
      this.router.navigate(['/register']);
    })
  }

  //login service
  login(email:string, password:string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then( () => {
      alert('Login successful');
      this.router.navigate(['/chat-page']);
    }, err => {
      alert(err.massage);
      this.router.navigate(['/login']);
    })
  }

  //Log out service
  logout() {
    this.fireAuth.signOut().then( () => {
      this.router.navigate(['/login']);
    }, err => {
      alert(err.massage);
    })
  }
}
