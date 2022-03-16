
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

import {Registered} from "../models/Registered";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl('')
    }
  );

  users: Registered[] = [];
  user = new Registered();
  username!: string;
  found = false;

  constructor(
    private router: Router,
    private appService: AppService
  )
  {}

  ngOnInit(): void {

  }

  get form() { return this.loginForm.value; }

  onSubmit() {


    this.appService.getRegistered().subscribe((data) => {
      this.users = data as Registered[];

      for (this.user of this.users) {
        if (this.user.Name ===  this.loginForm.value.username && this.loginForm.value.password === this.user.Password) {
          this.found = true;

        }
      }

      if (this.found) {
        this.appService.setLoggedInUser(this.user);
        this.router.navigate(['/list']);

      }
      else {
        alert('Sikertelen bejelentkezés! Hibás  felhasználónév vagy  jelszó.');
      }
    });
  }

}


