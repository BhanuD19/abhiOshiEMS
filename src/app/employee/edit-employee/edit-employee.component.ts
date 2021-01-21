import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/services/employee';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  item= <Employee>{};
  userForm: FormGroup;
  formValue= <Employee>{};
  isEditing = false;
  notEditing = !this.isEditing;

  validation_messages = {
    'firstName': [
      { type: 'required', message: 'FirstName is required.' },
      { type: 'minLength', message: 'FirstName should be more than 2 characters.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.'},
      { type: 'pattern', message: 'Enter valid email.' },
    ],
    'mobileNumber': [
      { type: 'required', message: 'MobileNumber is required.' },
      { type: 'pattern', message: 'Enter valid phone number.' },
      { type: 'minLength', message: 'Enter valid phone number.' },
      { type: 'maxLength', message: 'Enter valid phone number.' },
    ],
    'joiningDate': [
      { type: 'required', message: 'JoiningDate is required.' },
    ]
  };


  constructor(public firebaseService: FirebaseService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data']
      console.log(data)
      if(data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: [{value: this.item.firstName, disabled: true}, [Validators.required, Validators.minLength(2)]],
      lastName: [{value: this.item.lastName, disabled: true}],
      email: [{value: this.item.email, disabled: true}, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: [{value: this.item.mobileNumber, disabled: true}, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6), Validators.maxLength(10)]],
      joiningDate: [{value: this.item.joiningDate, disabled: true}, [Validators.required ]],
    })
  } 

  onSubmit(value) {
    this.formValue.firstName = value.firstName;
    this.formValue.lastName = value.lastName;
    this.formValue.email = value.email;
    this.formValue.mobileNumber = parseInt(value.mobileNumber);
    this.formValue.joiningDate = value.joiningDate;
    this.formValue.lastPayslip = new Date(0);
    this.firebaseService.updateUser(this.item.id, this.formValue).then(res => {
      this.router.navigate(['/home'])
    })
  }

  delete() {
    this.firebaseService.deleteUser(this.item.id).then(res => {
      this.router.navigate(['/home'])
    }, err => {
      console.log(err);
    })
  }

  edit() {
    this.isEditing = true;
    console.log('inside edit function' + 'value of isEditing' + this.isEditing);
    this.userForm.enable();
  }

  cancel() {
    this.router.navigate(['/home'])
  }

  generatePayslip() {
    console.log(this.item.id)
    this.router.navigate(['/payslip/'+this.item.id]);
  }
}
