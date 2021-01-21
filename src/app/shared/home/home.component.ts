import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service'; 
import { Employee } from 'src/app/services/employee';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchValue: string = "";
  items: Array<Employee>; 
  name_filtered_items: Array<Employee>;

  constructor(public firebaseService: FirebaseService, private router: Router ) {}

  ngOnInit(): void {


    this.getData();
  }



  getData() {
    console.log("getting data");
    this.firebaseService.getUsers().subscribe(result => {
      this.items = result.map( e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Employee)
        }
      });
    })
    console.log(this.items)
    this.name_filtered_items = this.items
  }

  viewDetails(item){
    console.log('from home' + item.id)
    this.router.navigate(['/details/'+ item.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.items = result.map( e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Employee)
        }
    })
  })
}

}
