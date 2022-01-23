import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../../interfaces/User'
import { Observable } from "rxjs"
import { AuthService } from '../authService/auth.service'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseURL: String = "http://localhost:4500/user"
  private loginURL: string = "/login"
  private registerURL: string = "/register"
  private logoutURL: string = "/logout"
  private refreshURL: string = "/refresh"

  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(fullname: string, username: string, password: string): Observable<{status: string, user: User, accessToken: string}>{
    const newUser = {
      "fullname": fullname,
      "username": username,
      "password": password,
      "role"    : "admin-group"
    }
    return this.http.post<{status: string, user: User, accessToken: string}>(this.baseURL + this.registerURL, newUser)
  }

  loginUser(username: string, password: string): Observable<{ status: string, token: string }>{
    const User = {
      "username": username,
      "password": password
    }
    return this.http.post<{ status: string, token: string }>(this.baseURL + this.loginURL, User)
  }

  logoutUser(id: string): Observable<{ message: string, status: string }>{
    const UserID = {
      "id": id
    }
    return this.http.post<{ message: string, status: string }>(this.baseURL + this.logoutURL, UserID)
  }

  refreshToken(userid: string): Observable<{ token: string }> {
    const Userid = {
      "userid": userid
    }
    return this.http.post<{ token: string }>(this.baseURL + this.refreshURL, Userid, { headers: this.authService.genHeader()})
  }

}
