import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service'
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean=false
  loggedOut:boolean=false

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn(path: string): any {

    if((this.authService.isLoggedIn)) {
      this.loggedIn=true
      this.loggedOut=false
      if((this.authService.isLoggedIn && this.authService.isExpired)) {

        const userid = this.authService.getUserId()
        if (!userid) {
          this.router.navigate(['/login'])
          return
        }
        this.userService.refreshToken(userid).subscribe((res) => {
          if (!res) {
            console.log("Es konnte kein neuer AccessToken erhalten werden!")
          }
          this.authService.login(res.token[0])
          this.authService.setUserId(res.token[1])
        })
      }
      this.router.navigate(['/',path])
      this.ngOnInit()
    } else {
      this.loggedIn=false
      this.router.navigate(['/login'])
    }
  }

  logout(): any {
    localStorage.removeItem('username')
    this.loggedOut=true
    this.loggedIn=false
    const userid = this.authService.getUserId()
    if (!userid) return console.log("User nicht angemeldet!")
    this.userService.logoutUser(userid).subscribe((res) => {
      if(res.status == 'logout') {
        this.authService.logout()
        this.router.navigate(['/login'])
      }
    })
  }
}
