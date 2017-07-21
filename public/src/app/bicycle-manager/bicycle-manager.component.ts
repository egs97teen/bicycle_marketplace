import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-bicycle-manager',
  templateUrl: './bicycle-manager.component.html',
  styleUrls: ['./bicycle-manager.component.css']
})
export class BicycleManagerComponent implements OnInit {
	user;
  
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  	this._userService.check_session().then( data => this.user = data ).catch( err => this._router.navigate(['landing']))
  }

  logout() {
  	this._userService.logout().then(data => this._router.navigate(['landing'])).catch()
  }
}
