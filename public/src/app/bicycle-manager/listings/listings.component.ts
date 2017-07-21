import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../user';
import { UserService } from './../../user.service';
import { Bicycle } from './../../bicycle';
import { BicycleService } from './../../bicycle.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  new_bike = new Bicycle();
  errors = [];
  user_bikes: Array<Bicycle>;
  user_bike: Bicycle;


  constructor(private _userService: UserService, private _bicycleService: BicycleService, private _router: Router) { }

  ngOnInit() {
  	this.getUserBikes();
  }

  create_bike() {
  	this._bicycleService.createListing(this.new_bike).then( data => this.getUserBikes() ).catch( err => this.errors = err );
  	this.new_bike = new Bicycle();
  }

  getUserBikes() {
  	this._bicycleService.getUserBikes().then( data => this.user_bikes = data ).catch( err => this.errors = err );
  }

  updateBike(bike_id, user_bike) {
  	this._bicycleService.updateBike(bike_id, this.user_bike).then( data => this.getUserBikes() ).catch( err => this.errors = err );
  }

  deleteBike(bike_id) {
  	this._bicycleService.deleteBike(bike_id).then( data => this.getUserBikes() ).catch( err => this.errors = err );
  }

}
