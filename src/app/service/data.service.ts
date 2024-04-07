import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore : AngularFirestore) { }
  
  //add user collection 
  addUser(user: User, email: string) {
    user.avatarUrl = 'assets/images/male.png';
    return this.firestore.collection('/Users').doc(email).set(user);
  }

  // get user by id document
  getUser(userId: string){
    return this.firestore.collection('/Users').doc(userId).get();
  }

}
