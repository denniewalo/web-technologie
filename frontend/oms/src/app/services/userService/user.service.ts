import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs"
import { User } from 'src/app/interfaces/User'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseURL: String = "http://localhost:4500/user"
  private loginURL: string = "/login"
  private registerURL: string = "/register"
  private logoutURL: string = "/logout"
  private authorizeURL: string = "/authorize"
  private refreshURL: string = "/refresh"

  constructor(private http: HttpClient) { }

  registerUser(fullname: string, username: string, password: string): Observable<{message: string, data: User}>{
    const newUser = {
      "fullname": fullname,
      "username": username,
      "password": password,
      "role": this.getGroup()
    }
    return this.http.post<{ message: string, data: User}>(this.baseURL + this.registerURL, newUser)
  }

  loginUser(username: string, password: string): Observable<{ status: string, token: string }>{
    const User = {
      "username": username,
      "password": password,
      "role": this.getGroup()
    }
    return this.http.post<{ status: string, token: string }>(this.baseURL + this.loginURL, User)
  }

  logoutUser(id: string): Observable<{ message: string, status: string }>{
    const UserID = {
      "id": id
    }
    return this.http.post<{ message: string, status: string }>(this.baseURL + this.logoutURL, UserID)
  }

  authorizeUser(): Observable<{ message: string, status: string }> {
    return this.http.get<{ message: string, status: string }>(this.baseURL + this.authorizeURL)
  }

  refreshToken(userid: string): Observable<{ token: string }> {
    const Userid = {
      "userid": userid
    }
    return this.http.post<{ token: string }>(this.baseURL + this.refreshURL, Userid)
  }

  getGroup() {
    return "user-group"
  }
}
