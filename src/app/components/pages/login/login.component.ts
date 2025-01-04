import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor() {}

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  })

  sample_user = [{
    userName: 'admin',
    password: 'admin'
  },
{
  userName: 'rashik',
  password: '123'
}]

  ngOnInit() {
    // do something
  }

  login() {
    let username = this.loginForm.value.userName;
    let password = this.loginForm.value.password;
    if (this.sample_user.find(user=> user.userName === username && user.password === password)) {
      console.log('Login Successful');
    } else {
      console.log('Login Failed');
    }
  }

}
