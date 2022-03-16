import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

import { Cars } from '../models/Cars';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  cars : any = [];

  constructor(private appService: AppService,
              private router: Router) { 
    this.getCar();
  }

  ngOnInit(): void {
  }

  getCar(){
    this.appService.getCars().subscribe((data) =>{
      this.cars = data;
    });
  }

  car = new Cars();
  onAddPost(){
    var name = (document.getElementById('Name') as HTMLInputElement).value;
    var fuel = (document.getElementById('Fuel') as HTMLInputElement).value;
    var year = (document.getElementById('Year') as HTMLInputElement).value;
    var price = (document.getElementById('Price') as HTMLInputElement).value;

    var year2: number = +year;
    var price2: number = +price;

    this.car.Name = name;
    this.car.Fuel = fuel;
    this.car.Year = year2;
    this.car.Price = price2;
    this.appService.createCar(this.car).subscribe(car => this.car);
  }

  
}
