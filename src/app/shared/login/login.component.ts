import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validation_messages = {
    'userName': [
      { type: 'required', message: 'Username is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
      { type: 'minLength', message: 'Password of min length 6 is required.'},
      { type: 'maxLength', message: 'Password exceeds limit (10char).'},
    ],
  };

  userForm: FormGroup;
  invalidLogin= false;


  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    })
  }

  handleLogin(value) {
    if(this.authService.authenticate(value.userName,value.password)) {
      this.router.navigate(['/home']);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}
