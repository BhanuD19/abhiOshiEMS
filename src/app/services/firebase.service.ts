import { Injectable } from '@angular/core';
import {  AngularFirestore } from '@angular/fire/firestore';

import { Employee } from '../services/employee';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updatePayslip(userKey, value) {
    const update= this.db.collection('users').doc(userKey).update({lastPayslip: value});
  }
  updateUser(userKey, value){
    value.nameToSearch = value.firstName.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('users').add({
     firstName: value.firstName,
    lastName: value.lastName,
    nameToSearch: value.firstName.toLowerCase(),
    email: value.email,
    mobileNumber: value.mobileNumber,
    joiningDate: value.joiningDate,
    lastPayslip: value.lastPayslip,
    imageLink: avatar
    });
  }
  
}
