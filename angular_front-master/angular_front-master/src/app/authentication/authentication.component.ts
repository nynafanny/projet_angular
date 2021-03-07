import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { resourceLimits } from 'worker_threads';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit { 

  formGroup: FormGroup;
  title = 'demoApp';
  //login
  email:string;  
  password:string;
  // statusSubmit:Boolean = true;
  //register
  registerUserData = {
    username: "",
    email:"",
    password:"",
  };

  loginUserData = {    
    email:"",
    password:"",    
  };

  
  
  rcpassword:string;
  constructor(private router: Router, private _auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  registerUser() {    
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => console.log(res),
      (err) => {
        console.log(err)
      }
    )
  }
      
    loginUser(){
      console.log(this.loginUserData.email)
      console.log(this.loginUserData.password)
      this._auth.loginUser(this.loginUserData)
    .subscribe(
      (data:any) =>{
        console.log(data)
        if(!data){
          this._snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
            duration: 3000
          });
        }
        localStorage.setItem('token', data.data.token)
        this.router.navigate(["/home"])
      },
      (err: HttpErrorResponse)=>{
        this._snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
          duration: 3000
        });
        
      }
    )
    }

    // comparePassword():Boolean{
    //   return (this.registerUserData.password === this.rcpassword) ? true: false;
    // }
}

