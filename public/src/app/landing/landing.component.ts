import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../user';
import { Bicycle } from './../bicycle';
import { BicycleService } from './../bicycle.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user = new User();
  user_login = new User();
  errors = [];
  bikes: Array<Bicycle>
  index = 0;

  constructor(private _userService: UserService, private _bicycleService: BicycleService, private _router: Router) { }

  ngOnInit() {
    this._bicycleService.allBikes().then( data => { this.bikes = data; this.index = Math.floor(Math.random() * (this.bikes.length))}).catch( err => this.errors = err);
  }

  register() {
    this._userService.register(this.user).then( data => this._router.navigate(['bicycle_manager']) ).catch( err => this.errors = JSON.parse(err._body))
    this.user = new User();
  }

  login() {
    this._userService.login(this.user_login).then ( data => this._router.navigate(['bicycle_manager']) ).catch( err => this.errors = JSON.parse(err._body))
    this.user_login = new User();
  }
}
