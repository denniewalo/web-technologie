import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../services/userService/user.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    "fullname": new FormControl(),
    "username": new FormControl(),
    "password": new FormControl()
  });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    this.userService.registerUser(this.userForm.get("fullname").value, this.userForm.get("username").value, this.userForm.get("password").value ).subscribe((res) => {
        this.router.navigate(['/login'])
    })
  }

}
