import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../../interfaces/User'
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private loginURL: string = "http://localhost:4500/user/login"
  private registerURL: string = "http://localhost:4500/user/register"

  constructor(private http: HttpClient) { }

  registerUser(fullname: string, username: string, password: string): Observable<{message: string, data: User}>{
    const newUser= {
      "fullname": fullname,
      "username": username,
      "password": password
    }
    return this.http.post<{message: string, data: User}>(this.registerURL, newUser)
  }

  loginUser(username: string, password: string): Observable<{message: string, data: User}>{
    const User = {
      "username": username,
      "password": password
    }
    return this.http.post<{message: string, data: User}>(this.loginURL, User)
  }

}
