import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class EditEmployeeResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let employeeId = route.paramMap.get('id');
      this.firebaseService.getUser(employeeId).subscribe(data => {
          resolve(data);
      })
    })
  }
}
