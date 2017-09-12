import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../user';
import { UserService } from './../../user.service';
import { Bicycle } from './../../bicycle';
import { BicycleService } from './../../bicycle.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  all_bikes: Array<Bicycle>
  user;
  errors = [];
  bike_owner;
  show = [];

  constructor(private _bicycleService: BicycleService, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUser().then( data => {this.user = data; console.log(data)} ).catch(err => this.errors = JSON.parse(err._body) );
    this.getAllBikes();
  }

  getAllBikes() {
    this._bicycleService.allBikes().then( data => {this.all_bikes = data; for (var i =0; i < this.all_bikes.length; i++) {this.show.push(true)} }).catch( err => this.errors = err);
  }

  deleteBike(bike_id) {
    this._bicycleService.deleteBike(bike_id).then( data => this.getAllBikes() ).catch( err => this.errors = err );
  }

  show_contact(bike_user_id, idx) {
    this.show[idx] = false;
    this._userService.findUserByBike(bike_user_id).then( data => { this.bike_owner = data}).catch( err => this.errors = err);
  }
}
