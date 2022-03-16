import { Component, NgZone, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registered } from '../models/Registered';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: Registered[] = [];
  user = new Registered();
  found = false;

  userForm = new FormGroup({
   username: new FormControl(),
   password: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService,
  ) { this.validatorForm();}

  ngOnInit(): void {

  }
  validatorForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit() {
    this.appService.getRegistered().subscribe((data) => {
      this.users = data as Registered[];

      for(this.user of this.users){
        if(this.user.Name === this.userForm.value.username){
          this.found = true;
          alert('A felhasználónév létezik!');
          return;
        }
      }
      if(!this.userForm.valid){
        alert('A felhasználónév vagy jelszó helytelen! Felhasználó min 3 karakter Jelszó 6');
      }
      else{
        var name = (document.getElementById('Name') as HTMLInputElement).value;
        var password = (document.getElementById('Password') as HTMLInputElement).value;
        this.user.Name = name;
        this.user.Password = password;
        this.appService.createUser(this.user).subscribe(car => this.user);
        alert('sikeres reg');
      }
    })
  }

}
