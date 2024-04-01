import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore : AngularFirestore) { }
  
  //add user 
  addUser(user: User) {
    user.avatarUrl = 'assets/images/male.png';
    return this.firestore.collection('/Users').add(user);
  }

  // get user collection
  getUser(userId: string) {
    return this.firestore.collection('/Users').doc(userId).get();
  }

}
