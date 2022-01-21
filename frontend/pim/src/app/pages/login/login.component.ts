import { Component, OnInit} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from "@angular/router"
import { AuthService } from 'src/app/services/authService/auth.service'
import { UserService } from 'src/app/services/userService/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    "username": new FormControl((localStorage.getItem('username') || '')),
    "password": new FormControl()
  })

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
  }
  
  onFormSubmit(): void {
    if(this.authService.isLoggedIn) {
      console.log("Benutzer schon eingeloggt")
      return
    }
    // @ts-ignore
    localStorage.setItem('username', this.loginForm.get("username").value)
    // @ts-ignore
    this.userService.loginUser(this.loginForm.get("username").value, this.loginForm.get("password").value ).subscribe((res) => {
      if(res.status != "access") {
        this.router.navigate(['/login'])
        return
      } else {
        this.authService.login(res.token[0])
        this.authService.setUserId(res.token[1])
        this.router.navigate(['/products'])
      }
    })
  }
}
