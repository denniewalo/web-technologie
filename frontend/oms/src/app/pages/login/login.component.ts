import { Component, OnInit} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from "@angular/router"
import { AuthService } from 'src/app/services/authService/auth.service'
import { LokalstorageService } from 'src/app/services/localstorageService/lokalstorage.service'
import { UserService } from 'src/app/services/userService/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService, 
    private authService: AuthService, 
    private lokalstorageService: LokalstorageService
  ) {}

  loginForm = new FormGroup({
    "username": new FormControl(this.lokalstorageService.getUsername()),
    "password": new FormControl()
  })

  ngOnInit(): void {
  }
  
  onFormSubmit(): void {
    if(this.authService.isLoggedIn) {
      console.log("Benutzer schon eingeloggt")
      return
    }
    
    // @ts-ignore
    this.userService.loginUser(this.loginForm.get("username").value, this.loginForm.get("password").value).subscribe((res) => {
      if(res.status != "access") {
        this.router.navigate(['/login'])
        return
      } else {
        this.authService.login(res.token[0])
        this.lokalstorageService.setUserId(res.token[1])
        this.lokalstorageService.setRole(res.token[2])
        this.router.navigate(['/products'])
      }
    })
  }
}
