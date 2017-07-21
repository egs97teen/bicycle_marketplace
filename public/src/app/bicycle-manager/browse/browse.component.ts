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

  constructor(private _bicycleService: BicycleService, private _userService: UserService) { }

  ngOnInit() {
  	this._bicycleService.allBikes().then( data => this.all_bikes = data ).catch( err => this.errors = err );
  }

}
