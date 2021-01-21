import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Employee } from 'src/app/services/employee';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  formValue = <Employee>{};
  avatarLink: string = "";
  userForm: FormGroup;
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

  constructor(public firebaseService: FirebaseService, public fb: FormBuilder) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6), Validators.maxLength(10)]],
      joiningDate: ['', [Validators.required ]],
    })
  }

  onSubmit(value) {
    console.log(value);

    this.formValue.firstName = value.firstName;
    this.formValue.lastName = value.lastName;
    this.formValue.email = value.email;
    this.formValue.mobileNumber = parseInt(value.firstName);
    this.formValue.joiningDate = value.joiningDate;
    this.formValue.lastPayslip = new Date(0);
    this.firebaseService.createUser(this.formValue, "");
    this.userForm.reset();
    this.createForm();
  }

}
