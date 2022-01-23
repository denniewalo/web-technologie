import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LokalstorageService } from 'src/app/services/localstorageService/lokalstorage.service';
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

  constructor(
    private router: Router, 
    private userService: UserService,
    private lokalstorageService: LokalstorageService
  ) {}

  ngOnInit(): void {
  }

  onFormSubmit(): void {

    // @ts-ignore
    this.lokalstorageService.setUsername(this.registerForm.get("username").value)
    // @ts-ignore
    this.userService.registerUser(this.registerForm.get("fullname").value, this.registerForm.get("username").value, this.registerForm.get("password").value ).subscribe((res) => {
    
      if(res.status == "created" && res.user != undefined && res.accessToken != undefined) {
        this.lokalstorageService.setUserId(res.user.id)
        this.lokalstorageService.setUsername(res.user.username)
        this.lokalstorageService.setRole(res.user.role)
        this.lokalstorageService.setToken(res.accessToken)
        this.router.navigate(['/login'])
      }
    })
  }
}
