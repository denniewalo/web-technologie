import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from "../../services/userService/user.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    "fullname": new FormControl(),
    "username": new FormControl(),
    "password": new FormControl()
  });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    // @ts-ignore
    this.userService.registerUser(this.registerForm.get("fullname").value, this.registerForm.get("username").value, this.registerForm.get("password").value ).subscribe((res) => {
      if(res.message == "created") {
        this.router.navigate(['/login'])
      }
    })
  }
}
