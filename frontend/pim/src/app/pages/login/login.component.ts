import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    "username": new FormControl(),
    "password": new FormControl()
  });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    this.userService.loginUser(this.userForm.get("username").value, this.userForm.get("password").value ).subscribe((res) => {
        this.router.navigate(['/products'])
    })
  }

}
