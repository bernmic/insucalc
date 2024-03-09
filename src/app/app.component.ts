import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  daytimes: DaytimeData[] = [
    {icon: "breakfast_dining", text: "Morgen", factor: 1.25},
    {icon: "lunch_dining", text: "Mittag", factor: 1.00},
    {icon: "dinner_dining", text: "Abend", factor: 1.50},
  ];
  dayTime: string = "";
  kes: KEData[] =  [
    {text: "0", value: 0.0},
    {text: "1", value: 1.0},
    {text: "2", value: 2.0},
    {text: "3", value: 3.0},
    {text: "4", value: 4.0},
    {text: "5", value: 5.0},
    {text: "6", value: 6.0},
    {text: "7", value: 7.0},
    {text: "8", value: 8.0},
    {text: "9", value: 9.0},
    {text: "10", value: 10.0},
    {text: "+", value: 0.5},
  ];
  ke: string = "";
  movings: MovingData[] = [
    {icon: "airline_seat_recline_normal", text: "Wenig", factor: 1.0},
    {icon: "directions_walk", text: "Normal", factor: 0.9},
    {icon: "directions_run", text: "Viel", factor: 0.66},
  ];
  moving: string = "";
  calculation: string = "";

  ngOnInit(): void {
    const dt = new Date();
    let h = dt.getHours();
    if (h < 10) {
      this.dayTime = "breakfast_dining";
    }
    else if (h < 19) {
      this.dayTime = "lunch_dining";
    }
    else {
      this.dayTime = "dinner_dining";
    }
  }

  keClicked(ke: string): void {
    this.ke = ke;
  }
  movingClicked(moving: string): void {
    this.moving = moving;
  }
  daytimeClicked(dt: string): void {
    this.dayTime = dt;
  }
  calc(): void {
    if (this.ke === "" || this.dayTime === "" || this.moving === "") {
      this.calculation = "";
      return;
    }
    let valueKE = 0.0
    for (var ke of this.kes) {
      if (ke.text === this.ke) {
        valueKE = ke.value;
      }
    }
    let valueDaytime = 0.0
    for (var dt of this.daytimes) {
      if (dt.icon === this.dayTime) {
        valueDaytime = dt.factor;
      }
    }
    let valueMoving = 0.0
    for (var mv of this.movings) {
      if (mv.icon === this.moving) {
        valueMoving = mv.factor;
      }
    }
    let c = valueKE * valueDaytime * valueMoving;
    this.calculation = c.toPrecision(2);
  }
  clear(): void {
    this.calculation = "";
  }
}

export interface MovingData {
  icon: string;
  text: string;
  factor: number;
}

export interface DaytimeData {
  icon: string;
  text: string;
  factor: number;
}

export interface KEData {
  text: string;
  value: number;
}
