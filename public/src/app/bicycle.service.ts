import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class BicycleService {

  constructor(private _http: Http) { }

  createListing(bike) {
  	return this._http.post('/api/new_bike_listing', bike).map( data => data.json() ).toPromise();
  }

  allBikes() {
  	return this._http.get('/api/all_bikes').map( data => data.json() ).toPromise();
  }

  getUserBikes() {
    return this._http.get('/api/user_bikes').map( data => data.json() ).toPromise();
  }

  updateBike(bike_id, user_bike) {
  	return this._http.post('/api/update_bike/' + bike_id, user_bike).map( data => data.json() ).toPromise();
  }

  deleteBike(bike_id) {
  	return this._http.delete('/api/delete_bike/' + bike_id).map( data => data.json() ).toPromise();
  }
}
