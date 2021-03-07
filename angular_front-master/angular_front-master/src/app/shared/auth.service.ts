import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { baseUrl} from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {  
  
  
  // private _registerUrl = "https://api-assignement.herokuapp.com"
  

  constructor(private http: HttpClient, private router: Router){}
  

  registerUser(user){
    return this.http.post<any>(`${baseUrl}/users/`, user)
  }

  loginUser(user){
    return this.http.post<any>(`${baseUrl}/auth/login`, user)
  }

  loggedIn()  {
    return !!localStorage.getItem('token')
  }

  logOutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/authentication'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
