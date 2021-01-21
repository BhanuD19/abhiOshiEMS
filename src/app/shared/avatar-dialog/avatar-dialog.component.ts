import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Avatars } from '../../services/avatars';
@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars= Avatars;
  constructor() { }

  ngOnInit(): void {
    // this.getData();
  }

  getData() {
    // this.firebaseService.getAvatars().subscribe(result => {
      // this.avatars = result
    // })
  }
  close(avatar){
    // this.dialogRef.close(avatar);
  }

}
