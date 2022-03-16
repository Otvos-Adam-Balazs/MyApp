import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cars } from './models/Cars';
import { Registered } from './models/Registered';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  serviceURL = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new Registered();
  constructor(private http: HttpClient) { }

  createCar(data: Cars): Observable<Cars>{
    const url = `${this.serviceURL}/Cars`;
    return this.http.post<Cars>(url,data);
  }

  getCars() {
    return this.http.get(`${this.serviceURL}/Cars`);
  }

  getRegistered() {
    return this.http.get(`${this.serviceURL}/Registered`);
  }

  createUser(data : Registered): Observable<Registered>{
    const url = `${this.serviceURL}/Registered`;
    return this.http.post<Registered>(url,data);
  }

  setLoggedInUser(user: any){
    this.user = user;
  }

  getLoggedInUser(){
    return this.user;
  }
}

