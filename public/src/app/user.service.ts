import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }
  register(user) {
  	return this._http.post('/api/register', user).map( data => data.json() ).toPromise();
  }

  login(user) {
  	return this._http.post('/api/login', user).map( data => data.json() ).toPromise();
  }

  check_session() {
  	return this._http.get('/api/session').map( data => data.json() ).toPromise();
  }

  logout() {
  	return this._http.get('/api/logout').map( data => data.json() ).toPromise();
  }

  getUser() {
  	return this._http.get('/api/get_user').map( data => data.json() ).toPromise();
  }

  findUserByBike(bike_user_id) {
    return this._http.get('/api/user_bike/'+ bike_user_id).map (data => data.json() ).toPromise();
  }
  
}
